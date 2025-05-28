// Export the API client
export {apiClient} from './client';

// Export the services
export {coursesService} from './courses';
export {assignmentsService} from './assignments';
export {announcementsService, formatContextCodes} from './announcements';
export {usersService} from './users';
export {modulesService} from './modules';
export {enrollmentsService} from './enrollments';

// Export the interfaces
export type {Course, DashboardCard} from './courses';
export type {Assignment, Submission, TodoItem, UpcomingEvent} from './assignments';
export type {Announcement} from './announcements';
export type {User, UserColors} from './users';
export type {Module, ModuleItem} from './modules';
export type {Enrollment} from './enrollments';
