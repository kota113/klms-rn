import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';
import {apiClient, Course, coursesService, Module, ModuleItem, modulesService} from '../services/api';

// Load environment variables from .env file
dotenv.config({path: path.join(__dirname, '.env')});

// Base directory for storing materials
const MATERIALS_DIR = path.join(process.cwd(), 'materials');

// Ensure the materials directory exists
if (!fs.existsSync(MATERIALS_DIR)) {
    fs.mkdirSync(MATERIALS_DIR, {recursive: true});
}

/**
 * Main function to fetch and save course materials
 */
async function dumpCourseMaterials() {
    try {
        console.log('Fetching dashboard cards...');

        // Get dashboard cards (courses displayed on the dashboard)
        const dashboardCards = await coursesService.getDashboardCards();

        console.log(`Found ${dashboardCards.length} dashboard cards.`);

        // Process each dashboard card
        for (const card of dashboardCards) {
            try {
                // Fetch additional course details
                const course = await coursesService.getCourse(card.id, {
                    include: ['syllabus_body', 'public_description']
                });

                await processCourse(course);
            } catch (error) {
                console.error(`Error processing course ${card.name} (${card.id}):`, error);
            }
        }

        console.log('All course materials have been fetched and saved.');
    } catch (error) {
        console.error('Error fetching course materials:', error);
    }
}

/**
 * Process a single course
 * @param course - The course to process
 */
async function processCourse(course: Course) {
    console.log(`Processing course: ${course.name} (${course.id})`);

    // Create course directory
    const courseDir = path.join(MATERIALS_DIR, sanitizeFileName(course.name));
    if (!fs.existsSync(courseDir)) {
        fs.mkdirSync(courseDir, {recursive: true});
    }

    // Save course info
    saveCourseInfo(course, courseDir);

    // Get modules for the course
    const modules = await modulesService.getModules(course.id, {
        include: ['items']
    });

    console.log(`Found ${modules.length} modules for course ${course.name}.`);

    // Create index.md with links to modules
    createCourseIndex(course, modules, courseDir);

    // Process each module
    for (const module of modules) {
        await processModule(course, module, courseDir);
    }
}

/**
 * Save course information to a markdown file
 * @param course - The course to save
 * @param courseDir - The directory to save the course info to
 */
function saveCourseInfo(course: Course, courseDir: string) {
    const courseInfoPath = path.join(courseDir, 'course-info.md');

    let content = `# ${course.name}\n\n`;
    content += `Course Code: ${course.course_code}\n\n`;

    if (course.start_at) {
        content += `Start Date: ${new Date(course.start_at).toLocaleDateString()}\n\n`;
    }

    if (course.end_at) {
        content += `End Date: ${new Date(course.end_at).toLocaleDateString()}\n\n`;
    }

    if (course.public_description) {
        content += `## Description\n\n${course.public_description}\n\n`;
    }

    if (course.syllabus_body) {
        content += `## Syllabus\n\n${course.syllabus_body}\n\n`;
    }

    fs.writeFileSync(courseInfoPath, content);
    console.log(`Saved course info to ${courseInfoPath}`);
}

/**
 * Create an index.md file for a course with links to modules
 * @param course - The course
 * @param modules - The modules in the course
 * @param courseDir - The directory to save the index to
 */
function createCourseIndex(course: Course, modules: Module[], courseDir: string) {
    const indexPath = path.join(courseDir, 'index.md');

    let content = `# ${course.name}\n\n`;
    content += `Course Code: ${course.course_code}\n\n`;
    content += `## Modules\n\n`;

    modules.forEach(module => {
        const moduleDir = sanitizeFileName(module.name);
        content += `- [${module.name}](./${moduleDir}/index.md)\n`;
    });

    content += `\n## Course Information\n\n`;
    content += `- [Course Info](./course-info.md)\n`;

    fs.writeFileSync(indexPath, content);
    console.log(`Created course index at ${indexPath}`);
}

/**
 * Process a single module
 * @param course - The course the module belongs to
 * @param module - The module to process
 * @param courseDir - The course directory
 */
async function processModule(course: Course, module: Module, courseDir: string) {
    console.log(`Processing module: ${module.name}`);

    // Create module directory
    const moduleDir = path.join(courseDir, sanitizeFileName(module.name));
    if (!fs.existsSync(moduleDir)) {
        fs.mkdirSync(moduleDir, {recursive: true});
    }

    // Get module items if not included in the module
    let items = module.items;
    if (!items || items.length === 0) {
        items = await modulesService.getModuleItems(course.id, module.id, {
            include: ['content_details']
        });
    }

    console.log(`Found ${items.length} items in module ${module.name}.`);

    // Create module index with links to items
    createModuleIndex(module, items, moduleDir);

    // Process each item
    for (const item of items) {
        await processModuleItem(course, module, item, moduleDir);
    }
}

/**
 * Create an index.md file for a module with links to items
 * @param module - The module
 * @param items - The items in the module
 * @param moduleDir - The directory to save the index to
 */
function createModuleIndex(module: Module, items: ModuleItem[], moduleDir: string) {
    const indexPath = path.join(moduleDir, 'index.md');

    let content = `# ${module.name}\n\n`;

    if (items.length > 0) {
        content += `## Items\n\n`;

        items.forEach(item => {
            // Skip subheaders as they don't have content
            if (item.type === 'SubHeader') {
                content += `### ${item.title}\n\n`;
                return;
            }

            const itemFileName = getItemFileName(item);
            if (itemFileName) {
                content += `- [${item.title}](./${itemFileName})\n`;
            } else {
                content += `- ${item.title} (${item.type}): [View Online](${item.html_url})\n`;
            }
        });
    }

    fs.writeFileSync(indexPath, content);
    console.log(`Created module index at ${indexPath}`);
}

/**
 * Process a single module item
 * @param course - The course the item belongs to
 * @param module - The module the item belongs to
 * @param item - The item to process
 * @param moduleDir - The module directory
 */
async function processModuleItem(course: Course, module: Module, item: ModuleItem, moduleDir: string) {
    console.log(`Processing item: ${item.title} (${item.type})`);

    switch (item.type) {
        case 'File':
            await downloadFile(item, moduleDir);
            break;
        case 'Page':
            await savePage(course.id, item, moduleDir);
            break;
        case 'Discussion':
            await saveDiscussion(course.id, item, moduleDir);
            break;
        case 'Assignment':
            await saveAssignment(course.id, item, moduleDir);
            break;
        case 'Quiz':
            await saveQuiz(course.id, item, moduleDir);
            break;
        case 'ExternalUrl':
            saveExternalUrl(item, moduleDir);
            break;
        case 'ExternalTool':
            saveExternalTool(item, moduleDir);
            break;
        case 'SubHeader':
            // SubHeaders don't have content to save
            break;
        default:
            console.log(`Skipping item of type ${item.type}`);
    }
}

/**
 * Download a file
 * @param item - The file item
 * @param moduleDir - The directory to save the file to
 */
async function downloadFile(item: ModuleItem, moduleDir: string) {
    try {
        // Get the file URL
        const fileUrl = item.url;
        if (!fileUrl) {
            console.log(`No URL found for file: ${item.title}`);
            return;
        }

        // Extract file extension from item title or default to .bin
        let extension = '.bin';
        const titleParts = item.title.split('.');
        if (titleParts.length > 1) {
            // If the title has an extension, use it
            const ext = titleParts[titleParts.length - 1];
            // Check if it's a valid extension (no path separators or invalid chars)
            if (ext && ext.length > 0 && ext.length <= 10 && !ext.match(/[\/\\:*?"<>|]/)) {
                extension = `.${ext}`;
            }
        } else {
            // Try to extract from URL as fallback, but only if it looks like a valid extension
            const urlParts = fileUrl.split('.');
            if (urlParts.length > 1) {
                const ext = urlParts[urlParts.length - 1].split('?')[0].split('/')[0];
                // Check if it's a valid extension (no path separators or invalid chars)
                if (ext && ext.length > 0 && ext.length <= 10 && !ext.match(/[\/\\:*?"<>|]/)) {
                    extension = `.${ext}`;
                }
            }
        }

        // Create file name without duplicate extensions
        let baseFileName = item.title;
        // Remove the extension from the title if it already ends with the detected extension
        if (extension !== '.bin' && baseFileName.toLowerCase().endsWith(extension.toLowerCase())) {
            baseFileName = baseFileName.slice(0, -extension.length);
        }
        const fileName = sanitizeFileName(baseFileName) + extension;
        const filePath = path.join(moduleDir, fileName);

        // Download the file
        console.log(`Downloading file: ${item.title} to ${filePath}`);

        // Try different URL formats
        const urlFormats = [
            fileUrl, // Original URL
            fileUrl.endsWith('/download') ? fileUrl : `${fileUrl}/download`, // Append /download if not present
            fileUrl.replace('/files/', '/file_contents/'), // Try file_contents endpoint
        ];

        // Log the file URL for debugging
        console.log(`Attempting to download from URL: ${fileUrl}`);

        // Try to extract course ID and file ID from the URL for a direct file URL
        const matches = fileUrl.match(/\/courses\/(\d+)\/files\/(\d+)/);
        if (matches && matches.length === 3) {
            const courseId = matches[1];
            const fileId = matches[2];
            // Add direct file URL to the formats to try
            urlFormats.push(`https://lms.keio.jp/api/v1/courses/${courseId}/files/${fileId}/download`);
        }

        let downloadSuccess = false;
        let lastError = null;

        // Try each URL format until one works
        for (const downloadUrl of urlFormats) {
            try {
                // First, try to get the response with JSON to check if it's metadata
                const metadataResponse = await axios({
                    method: 'GET',
                    url: downloadUrl,
                    responseType: 'json',
                    headers: {
                        Authorization: `Bearer ${await getToken()}`
                    },
                    validateStatus: (status) => status < 400 // Only treat HTTP errors as errors
                });

                // Check if the response is a JSON object with a url field (metadata)
                if (metadataResponse.data && typeof metadataResponse.data === 'object' && metadataResponse.data.url) {
                    console.log(`Received metadata for file. Actual download URL: ${metadataResponse.data.url}`);

                    // Use the URL from the metadata to download the actual file
                    const fileResponse = await axios({
                        method: 'GET',
                        url: metadataResponse.data.url,
                        responseType: 'arraybuffer',
                        headers: {
                            Authorization: `Bearer ${await getToken()}`
                        },
                        validateStatus: (status) => status < 400
                    });

                    // Log response details for debugging
                    console.log(`File response received with status: ${fileResponse.status}`);
                    console.log(`File response content type: ${fileResponse.headers['content-type']}`);
                    console.log(`File response data length: ${fileResponse.data.length} bytes`);

                    // Write the file directly from the buffer
                    fs.writeFileSync(filePath, fileResponse.data);
                } else {
                    // Not metadata, just a regular file response
                    console.log(`Response received with status: ${metadataResponse.status}`);
                    console.log(`Response content type: ${metadataResponse.headers['content-type']}`);

                    // If the response was treated as JSON but isn't actually JSON (e.g., it's a binary file),
                    // we need to re-fetch it as arraybuffer
                    const response = await axios({
                        method: 'GET',
                        url: downloadUrl,
                        responseType: 'arraybuffer',
                        headers: {
                            Authorization: `Bearer ${await getToken()}`
                        },
                        validateStatus: (status) => status < 400
                    });

                    console.log(`Response data length: ${response.data.length} bytes`);
                    fs.writeFileSync(filePath, response.data);
                }

                // Verify the file was written correctly and has content
                const stats = fs.statSync(filePath);
                if (stats.size === 0) {
                    throw new Error('Downloaded file is empty');
                }

                console.log(`File downloaded: ${filePath} (${stats.size} bytes)`);

                downloadSuccess = true;
                break; // Exit the loop if download is successful
            } catch (err) {
                lastError = err;
                if ((err as any).response && (err as any).response.status === 404) {
                    console.log(`File not found (404) at ${downloadUrl}, trying next URL format...`);
                } else {
                    console.log(`Failed to download from ${downloadUrl}: ${(err as any).message}, trying next URL format...`);
                }
            }
        }

        if (!downloadSuccess) {
            console.warn(`Could not download file ${item.title} after trying all URL formats. Skipping.`);
            if (lastError) {
                if ((lastError as any).response && (lastError as any).response.status === 404) {
                    console.error(`Last error: File not found (404). The file might have been deleted or you might not have permission to access it.`);
                } else {
                    console.error(`Last error: ${(lastError as any).message}`);
                }
            }

            // Create a placeholder markdown file with information about the missing file
            const placeholderPath = path.join(moduleDir, `${sanitizeFileName(item.title)}_DOWNLOAD_FAILED.md`);
            let placeholderContent = `# ${item.title} (Download Failed)\n\n`;
            placeholderContent += `This file could not be downloaded. It might have been deleted or you might not have permission to access it.\n\n`;
            placeholderContent += `Original URL: ${fileUrl}\n\n`;
            placeholderContent += `Attempted URLs:\n`;
            urlFormats.forEach(url => {
                placeholderContent += `- ${url}\n`;
            });

            fs.writeFileSync(placeholderPath, placeholderContent);
            console.log(`Created placeholder file at ${placeholderPath}`);
        }
    } catch (error) {
        console.error(`Error downloading file ${item.title}:`, error);
    }
}

/**
 * Save a page as markdown
 * @param courseId - The course ID
 * @param item - The page item
 * @param moduleDir - The directory to save the page to
 */
async function savePage(courseId: number, item: ModuleItem, moduleDir: string) {
    try {
        if (!item.page_url) {
            console.log(`No page URL found for: ${item.title}`);
            return;
        }

        // Fetch page content
        const pageUrl = `/courses/${courseId}/pages/${item.page_url}`;
        const page = await apiClient.get(pageUrl);

        // Save page content as markdown
        const fileName = `${sanitizeFileName(item.title)}.md`;
        const filePath = path.join(moduleDir, fileName);

        let content = `# ${item.title}\n\n`;
        content += page.body || '';

        fs.writeFileSync(filePath, content);
        console.log(`Saved page to ${filePath}`);
    } catch (error) {
        console.error(`Error saving page ${item.title}:`, error);
    }
}

/**
 * Save a discussion as markdown
 * @param courseId - The course ID
 * @param item - The discussion item
 * @param moduleDir - The directory to save the discussion to
 */
async function saveDiscussion(courseId: number, item: ModuleItem, moduleDir: string) {
    try {
        // Extract discussion ID from URL
        const urlParts = item.url.split('/');
        const discussionId = urlParts[urlParts.length - 1];

        // Fetch discussion content
        const discussionUrl = `/courses/${courseId}/discussion_topics/${discussionId}`;
        const discussion = await apiClient.get(discussionUrl);

        // Save discussion content as markdown
        const fileName = `${sanitizeFileName(item.title)}.md`;
        const filePath = path.join(moduleDir, fileName);

        let content = `# ${item.title}\n\n`;
        content += `Posted by: ${discussion.author?.display_name || 'Unknown'}\n\n`;
        content += `Posted on: ${new Date(discussion.posted_at).toLocaleString()}\n\n`;
        content += `## Message\n\n${discussion.message || ''}\n\n`;

        if (discussion.attachments && discussion.attachments.length > 0) {
            content += `## Attachments\n\n`;
            discussion.attachments.forEach((attachment: any) => {
                content += `- [${attachment.display_name}](${attachment.url})\n`;
            });
            content += '\n';
        }

        fs.writeFileSync(filePath, content);
        console.log(`Saved discussion to ${filePath}`);
    } catch (error) {
        console.error(`Error saving discussion ${item.title}:`, error);
    }
}

/**
 * Save an assignment as markdown
 * @param courseId - The course ID
 * @param item - The assignment item
 * @param moduleDir - The directory to save the assignment to
 */
async function saveAssignment(courseId: number, item: ModuleItem, moduleDir: string) {
    try {
        // Extract assignment ID from URL
        const urlParts = item.url.split('/');
        const assignmentId = urlParts[urlParts.length - 1];

        // Fetch assignment content
        const assignmentUrl = `/courses/${courseId}/assignments/${assignmentId}`;
        const assignment = await apiClient.get(assignmentUrl);

        // Save assignment content as markdown
        const fileName = `${sanitizeFileName(item.title)}.md`;
        const filePath = path.join(moduleDir, fileName);

        let content = `# ${item.title}\n\n`;

        if (assignment.due_at) {
            content += `Due: ${new Date(assignment.due_at).toLocaleString()}\n\n`;
        }

        if (assignment.points_possible) {
            content += `Points: ${assignment.points_possible}\n\n`;
        }

        content += `## Description\n\n${assignment.description || ''}\n\n`;

        if (assignment.submission_types && assignment.submission_types.length > 0) {
            content += `## Submission Types\n\n`;
            assignment.submission_types.forEach((type: string) => {
                content += `- ${type}\n`;
            });
            content += '\n';
        }

        fs.writeFileSync(filePath, content);
        console.log(`Saved assignment to ${filePath}`);
    } catch (error) {
        console.error(`Error saving assignment ${item.title}:`, error);
    }
}

/**
 * Save a quiz as markdown
 * @param courseId - The course ID
 * @param item - The quiz item
 * @param moduleDir - The directory to save the quiz to
 */
async function saveQuiz(courseId: number, item: ModuleItem, moduleDir: string) {
    try {
        // Extract quiz ID from URL
        const urlParts = item.url.split('/');
        const quizId = urlParts[urlParts.length - 1];

        // Fetch quiz content
        const quizUrl = `/courses/${courseId}/quizzes/${quizId}`;
        const quiz = await apiClient.get(quizUrl);

        // Save quiz content as markdown
        const fileName = `${sanitizeFileName(item.title)}.md`;
        const filePath = path.join(moduleDir, fileName);

        let content = `# ${item.title}\n\n`;

        if (quiz.due_at) {
            content += `Due: ${new Date(quiz.due_at).toLocaleString()}\n\n`;
        }

        if (quiz.points_possible) {
            content += `Points: ${quiz.points_possible}\n\n`;
        }

        if (quiz.time_limit) {
            content += `Time Limit: ${quiz.time_limit} minutes\n\n`;
        }

        content += `## Description\n\n${quiz.description || ''}\n\n`;

        fs.writeFileSync(filePath, content);
        console.log(`Saved quiz to ${filePath}`);
    } catch (error) {
        console.error(`Error saving quiz ${item.title}:`, error);
    }
}

/**
 * Save an external URL as markdown
 * @param item - The external URL item
 * @param moduleDir - The directory to save the URL to
 */
function saveExternalUrl(item: ModuleItem, moduleDir: string) {
    const fileName = `${sanitizeFileName(item.title)}.md`;
    const filePath = path.join(moduleDir, fileName);

    let content = `# ${item.title}\n\n`;
    content += `External URL: [${item.external_url}](${item.external_url})\n\n`;

    fs.writeFileSync(filePath, content);
    console.log(`Saved external URL to ${filePath}`);
}

/**
 * Save an external tool as markdown
 * @param item - The external tool item
 * @param moduleDir - The directory to save the tool to
 */
function saveExternalTool(item: ModuleItem, moduleDir: string) {
    const fileName = `${sanitizeFileName(item.title)}.md`;
    const filePath = path.join(moduleDir, fileName);

    let content = `# ${item.title}\n\n`;
    content += `External Tool: [${item.title}](${item.html_url})\n\n`;

    fs.writeFileSync(filePath, content);
    console.log(`Saved external tool to ${filePath}`);
}

/**
 * Get the file name for a module item
 * @param item - The module item
 * @returns The file name or null if the item doesn't have a file
 */
function getItemFileName(item: ModuleItem): string | null {
    switch (item.type) {
        case 'File':
            // Extract file extension from URL or default to .bin
            const urlParts = item.url?.split('.') || [];
            const extension = urlParts.length > 1 ? `.${urlParts[urlParts.length - 1].split('?')[0]}` : '.bin';
            return `${sanitizeFileName(item.title)}${extension}`;
        case 'Page':
        case 'Discussion':
        case 'Assignment':
        case 'Quiz':
        case 'ExternalUrl':
        case 'ExternalTool':
            return `${sanitizeFileName(item.title)}.md`;
        default:
            return null;
    }
}

/**
 * Sanitize a file name by removing invalid characters
 * @param fileName - The file name to sanitize
 * @returns The sanitized file name
 */
function sanitizeFileName(fileName: string): string {
    return fileName
        .replace(/[<>:"/\\|?*]/g, '_') // Replace invalid file name characters
        .replace(/\s+/g, '_')          // Replace spaces with underscores
        .replace(/_+/g, '_')           // Replace multiple underscores with a single one
        .trim();
}

/**
 * Get the access token from the API client
 * @returns The access token
 */
async function getToken(): Promise<string> {
    // Get the token from the environment variable
    // The ApiClient will also use this token in Node.js environment
    return process.env.CANVAS_API_TOKEN || '';
}

// Run the script
dumpCourseMaterials().catch(console.error);
