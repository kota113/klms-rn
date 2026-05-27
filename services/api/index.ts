// Export the API client
export {apiClient} from './client';

// Export the services
export {coursesService} from './courses';
export {assignmentsService} from './assignments';
export {announcementsService, formatContextCodes} from './announcements';
export {usersService} from './users';
export {modulesService} from './modules';
export {pagesService} from './pages';
export {enrollmentsService} from './enrollments';
export {calendarService} from './calendar';
export {conversationsService} from './conversations';

// Export the interfaces
export type {Course, DashboardCard} from './courses';
export type {Assignment, Submission, TodoItem, UpcomingEvent} from './assignments';
export type {Announcement} from './announcements';
export type {User, UserColors} from './users';
export type {Module, ModuleItem} from './modules';
export type {Page} from './pages';
export type {Enrollment} from './enrollments';
export type {CalendarEvent} from './calendar';
export type {Conversation, ConversationParticipant, ConversationDetail, ConversationMessage} from './conversations';
