# Canvas LMS API Client

This directory contains the API client for interacting with the Canvas LMS API. The client is built with separation of
concerns in mind, with a base client that handles authentication and common functionality, and endpoint-specific modules
for different parts of the API.

## Base URL

The base URL for the API is `https://lms.keio.jp/api/v1`.

## Authentication

The API client uses a manually-generated access token for authentication. The token is stored in the `AsyncStorage` and
is automatically refreshed when it expires.

## Usage

Import the services you need from the API client:

```typescript
import {
  coursesService,
  assignmentsService,
  announcementsService,
  usersService,
  modulesService,
  enrollmentsService
} from '../services/api';
```

Then use the services to interact with the API:

```typescript
// Get all courses for the current user
const courses = await coursesService.getCourses();

// Get a single course by ID
const course = await coursesService.getCourse(123);

// Get assignments for a course
const assignments = await assignmentsService.getAssignments(123);

// Get announcements for a course
const announcements = await announcementsService.getCourseAnnouncements(123);

// Get the current user's information
const currentUser = await usersService.getCurrentUser();

// Get all custom colors for the current user
const userColors = await usersService.getUserColors();

// Get a specific custom color for a course
const courseAssetString = usersService.formatCourseAssetString(123);
const courseColor = await usersService.getUserColor(courseAssetString);

// Get modules for a course
const modules = await modulesService.getModules(123, {include: ['items']});

// Get items in a module
const moduleItems = await modulesService.getModuleItems(123, 456);

// Get enrollments for a course
const enrollments = await enrollmentsService.getCourseEnrollments(123, {include: ['grades']});

// Get enrollments for the current user
const userEnrollments = await enrollmentsService.getSelfEnrollments({include: ['grades']});
```

## Available Services

### Courses Service

- `getCourses(params?)`: Get a list of all courses for the current user
- `getCourse(courseId, params?)`: Get a single course by ID
- `getDashboardCards()`: Get the dashboard cards for the current user
- `getRecentCourses()`: Get the recent courses for the current user
- `getFavoriteCourses()`: Get the favorite courses for the current user

### Assignments Service

- `getAssignments(courseId, params?)`: Get a list of assignments for a course
- `getAssignment(courseId, assignmentId, params?)`: Get a single assignment by ID
- `getUserAssignments()`: Get all assignments for the current user
- `getUpcomingAssignments()`: Get upcoming assignments for the current user

### Announcements Service

- `getCourseAnnouncements(courseId, params?)`: Get a list of announcements for a course
- `getCourseAnnouncement(courseId, announcementId)`: Get a single announcement by ID
- `getAnnouncements(contextCodes, params?)`: Get announcements for multiple courses
    - `contextCodes`: Required array of context codes in the format "course_[courseId]" or course IDs that will be
      formatted
    - Example: `getAnnouncements([123, 456])` or `getAnnouncements(['course_123', 'course_456'])`
- `formatContextCodes(courseIds)`: Helper function to format course IDs into context codes
    - Example: `formatContextCodes([123, 456])` returns `['course_123', 'course_456']`

### Users Service

- `getCurrentUser(params?)`: Get the current user's information
    - Example: `getCurrentUser({ include: ['uuid', 'last_login'] })`
- `getUserColors()`: Get all custom colors for the current user
    - Extracts the "custom_colors" object from the API response
    - Returns a map of asset strings to hex color codes
    - Example: `getUserColors()` might return `{ "course_123": "#ff0000", "course_456": "#00ff00" }`
- `getUserColor(assetString)`: Get a specific custom color for the current user
    - Fetches all colors and extracts the requested one from the "custom_colors" object
    - Example: `getUserColor('course_123')` returns `{ hexcode: "#ff0000" }`
- `formatCourseAssetString(courseId)`: Format a course ID into an asset string for colors API
    - Example: `formatCourseAssetString(123)` returns `"course_123"`

### Modules Service

- `getModules(courseId, params?)`: Get a list of modules for a course
    - Example: `getModules(123, { include: ['items'] })`
- `getModule(courseId, moduleId, params?)`: Get a single module by ID
    - Example: `getModule(123, 456, { include: ['items'] })`
- `getModuleItems(courseId, moduleId, params?)`: Get a list of items in a module
    - Example: `getModuleItems(123, 456, { include: ['content_details'] })`
- `getModuleItem(courseId, moduleId, itemId, params?)`: Get a single module item by ID
    - Example: `getModuleItem(123, 456, 789, { include: ['content_details'] })`

### Enrollments Service

- `getCourseEnrollments(courseId, params?)`: Get a list of enrollments for a course
    - Example: `getCourseEnrollments(123, { include: ['grades'], type: ['StudentEnrollment'] })`
- `getUserEnrollments(userId, params?)`: Get a list of enrollments for a user
    - Example: `getUserEnrollments(456, { include: ['grades'], course_id: 123 })`
- `getSelfEnrollments(params?)`: Get a list of enrollments for the current user
    - Example: `getSelfEnrollments({ include: ['grades'], course_id: 123 })`
- `getEnrollment(accountId, enrollmentId)`: Get a single enrollment by ID
    - Example: `getEnrollment(123, 456)`

## Adding New Services

To add a new service:

1. Create a new file in the `/services/api` directory for your service
2. Import the `apiClient` from `./client`
3. Define interfaces for the data returned by the API
4. Create a service object with methods for interacting with the API
5. Export the service and interfaces
6. Add the exports to `index.ts`

## API Documentation

For more information about the Canvas LMS API, see the documentation in the `/docs/api` directory.
