const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const apiDocsUrl = 'https://lms.keio.jp/doc/api/api-docs.json';
const baseApiUrl = 'https://lms.keio.jp/doc/api';
const outputDir = path.join(__dirname);

// Function to fetch data from a URL
function fetchUrl(urlToFetch) {
    return new Promise((resolve, reject) => {
        https.get(urlToFetch, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (error) {
                    reject(new Error(`Failed to parse data from ${urlToFetch}: ${error.message}`));
                }
            });

        }).on('error', (error) => {
            reject(new Error(`Failed to fetch data from ${urlToFetch}: ${error.message}`));
        });
    });
}

// Function to fetch the main API documentation
function fetchApiDocs() {
    return fetchUrl(apiDocsUrl);
}

// Function to fetch detailed documentation for a specific endpoint
async function fetchEndpointDocs(endpointPath) {
    // Ensure the path starts with a slash
    const normalizedPath = endpointPath.startsWith('/') ? endpointPath : `/${endpointPath}`;
    const endpointUrl = `${baseApiUrl}${normalizedPath}`;
    return fetchUrl(endpointUrl);
}

// Function to save API documentation to files
async function saveApiDocs(apiDocs) {
    // Save the main API documentation file
    fs.writeFileSync(path.join(outputDir, 'api-docs.json'), JSON.stringify(apiDocs, null, 2));
    console.log('Saved api-docs.json');

    // Create a markdown summary file
    let markdownContent = `# API Documentation\n\n`;
    markdownContent += `## Available Endpoints\n\n`;

    // Process each API endpoint
    if (apiDocs.apis && Array.isArray(apiDocs.apis)) {
        // Create a directory for detailed endpoint documentation
        const endpointsDir = path.join(outputDir, 'endpoints');
        if (!fs.existsSync(endpointsDir)) {
            fs.mkdirSync(endpointsDir);
        }

        // Add each endpoint to the markdown summary
        for (const api of apiDocs.apis) {
            const endpointPath = api.path;
            const endpointDescription = api.description;

            markdownContent += `### ${endpointDescription}\n`;
            markdownContent += `Path: \`${endpointPath}\`\n\n`;

            try {
                // Fetch detailed documentation for this endpoint
                const endpointDocs = await fetchEndpointDocs(endpointPath);

                // Save the detailed documentation to a file
                const endpointFilename = endpointPath.replace(/^\//, '').replace(/\.json$/, '').replace(/\//g, '_');
                fs.writeFileSync(
                    path.join(endpointsDir, `${endpointFilename}.json`),
                    JSON.stringify(endpointDocs, null, 2)
                );
                console.log(`Saved ${endpointFilename}.json`);

                // Add detailed information to the markdown summary
                if (endpointDocs.apis && Array.isArray(endpointDocs.apis)) {
                    endpointDocs.apis.forEach(api => {
                        if (api.operations && Array.isArray(api.operations)) {
                            api.operations.forEach(operation => {
                                markdownContent += `- **${operation.method}** ${api.path}\n`;
                                markdownContent += `  - Description: ${operation.summary || 'No description'}\n`;

                                if (operation.parameters && operation.parameters.length > 0) {
                                    markdownContent += `  - Parameters:\n`;
                                    operation.parameters.forEach(param => {
                                        markdownContent += `    - ${param.name} (${param.paramType}, ${param.required ? 'required' : 'optional'}): ${param.description || 'No description'}\n`;
                                    });
                                }

                                if (operation.responseMessages && operation.responseMessages.length > 0) {
                                    markdownContent += `  - Response Codes:\n`;
                                    operation.responseMessages.forEach(response => {
                                        markdownContent += `    - ${response.code}: ${response.message}\n`;
                                    });
                                }

                                markdownContent += `\n`;
                            });
                        }
                    });
                }
            } catch (error) {
                console.error(`Error fetching detailed documentation for ${endpointPath}: ${error.message}`);
                markdownContent += `Could not fetch detailed documentation for this endpoint.\n\n`;
            }
        }
    }

    fs.writeFileSync(path.join(outputDir, 'api-docs.md'), markdownContent);
    console.log('Saved api-docs.md');
}

// Main function
async function main() {
    try {
        console.log('Fetching API documentation...');
        const apiDocs = await fetchApiDocs();
        console.log('API documentation fetched successfully.');

        console.log('Saving API documentation...');
        saveApiDocs(apiDocs);
        console.log('API documentation saved successfully.');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

main();
