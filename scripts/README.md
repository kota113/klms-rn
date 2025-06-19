# Course Materials Downloader

This script fetches all course materials from Canvas LMS and saves them locally in a structured format.

## Features

- Downloads all available courses
- Organizes materials by course and module
- Saves text content (pages, discussions, assignments, quizzes) as markdown files
- Downloads files (PDFs, documents, etc.)
- Creates index files for easy navigation

## Directory Structure

The script creates the following directory structure:

```
/materials
  /<course_name>
    /index.md                 # Course index with links to modules
    /course-info.md           # Course information, syllabus, etc.
    /<module_name>
      /index.md               # Module index with links to items
      /<file_name>            # Module items (files, pages, etc.)
```

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Canvas LMS API token

## Setup

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Set your Canvas API token as an environment variable:

```bash
# Windows (PowerShell)
$env:CANVAS_API_TOKEN="your_api_token_here"

# Windows (Command Prompt)
set CANVAS_API_TOKEN=your_api_token_here

# Linux/macOS
export CANVAS_API_TOKEN="your_api_token_here"
```

## Usage

Run the script:

```bash
# Using the npm script
npm run download-materials

# Using yarn
yarn download-materials

# Or directly with ts-node
npx ts-node scripts/dump-course-materials.ts
```

## How to Get a Canvas API Token

1. Log in to your Canvas LMS account
2. Go to Account > Settings
3. Scroll down to the "Approved Integrations" section
4. Click on "+ New Access Token"
5. Enter a purpose (e.g., "Course Materials Downloader")
6. Set an expiration date (optional)
7. Click "Generate Token"
8. Copy the token and save it securely

## Notes

- The script only downloads materials from courses where you have access
- Some content may not be downloadable due to permissions or content type
- External links and tools are saved as markdown files with links to the original content
