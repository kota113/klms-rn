import type {Announcement} from './announcements';
import type {Assignment, Submission, TodoItem, UpcomingEvent} from './assignments';
import type {CalendarEvent} from './calendar';
import type {Course, DashboardCard} from './courses';
import type {Enrollment} from './enrollments';
import type {Module} from './modules';
import type {Page} from './pages';
import type {PlannerItem, PlannerOverride} from './planner';
import type {User, UserColors} from './users';
import type {Conversation, ConversationDetail} from './conversations';
import course108970Json from './mockFixtures/demo/courses/108970/course.json';
import assignments108970Json from './mockFixtures/demo/courses/108970/assignments.json';
import modules108970Json from './mockFixtures/demo/courses/108970/modules.json';
import announcements108970Json from './mockFixtures/demo/courses/108970/announcements.json';
import enrollments108970Json from './mockFixtures/demo/courses/108970/enrollments.json';
import course102326Json from './mockFixtures/demo/courses/102326/course.json';
import assignments102326Json from './mockFixtures/demo/courses/102326/assignments.json';
import modules102326Json from './mockFixtures/demo/courses/102326/modules.json';
import announcements102326Json from './mockFixtures/demo/courses/102326/announcements.json';
import enrollments102326Json from './mockFixtures/demo/courses/102326/enrollments.json';
import course107665Json from './mockFixtures/demo/courses/107665/course.json';
import assignments107665Json from './mockFixtures/demo/courses/107665/assignments.json';
import modules107665Json from './mockFixtures/demo/courses/107665/modules.json';
import announcements107665Json from './mockFixtures/demo/courses/107665/announcements.json';
import enrollments107665Json from './mockFixtures/demo/courses/107665/enrollments.json';
import userProfileJson from './mockFixtures/demo/user-profile.json';

const normalizeAssignments = (json: unknown): Assignment[] => (json as any[]).map((assignment) => ({
  ...assignment,
  allowed_extensions: assignment.allowed_extensions ?? [],
}));

const normalizeAnnouncements = (json: unknown, courseId: number): Announcement[] => (json as any[]).map((announcement) => ({
  ...announcement,
  context_code: announcement.context_code ?? `course_${courseId}`,
  read_state: announcement.read_state ?? 'read',
  html_url: announcement.html_url ?? `https://lms.keio.jp/courses/${courseId}/discussion_topics/${announcement.id}`,
}));

const normalizeModules = (json: unknown): Module[] => (json as any[]).map((module) => ({
  ...module,
  state: module.state ?? 'active',
  completed_at: module.completed_at ?? null,
  items: module.items?.map((item: any) => ({
    ...item,
    url: item.url ?? item.html_url ?? '',
  })),
}));

const assignments108970 = normalizeAssignments(assignments108970Json);
const assignments102326 = normalizeAssignments(assignments102326Json);
const assignments107665 = normalizeAssignments(assignments107665Json);
const announcements108970 = normalizeAnnouncements(announcements108970Json, 108970);
const announcements102326 = normalizeAnnouncements(announcements102326Json, 102326);
const announcements107665 = normalizeAnnouncements(announcements107665Json, 107665);
const modules108970 = normalizeModules(modules108970Json);
const modules102326 = normalizeModules(modules102326Json);
const modules107665 = normalizeModules(modules107665Json);

const fixtureCourses = [
  course108970Json,
  course102326Json,
  course107665Json,
] as unknown as Course[];

const fixtureAssignments = [
  ...assignments108970,
  ...assignments102326,
  ...assignments107665,
];

const fixtureAnnouncements = [
  ...announcements108970,
  ...announcements102326,
  ...announcements107665,
];

const fixtureEnrollments = [
  ...enrollments108970Json,
  ...enrollments102326Json,
  ...enrollments107665Json,
] as unknown as Enrollment[];

const fixtureModulesByCourseId = new Map<number, Module[]>([
  [108970, modules108970],
  [102326, modules102326],
  [107665, modules107665],
]);

const fixtureAssignmentsByCourseId = new Map<number, Assignment[]>([
  [108970, assignments108970],
  [102326, assignments102326],
  [107665, assignments107665],
]);

export const DEMO_COURSE_IDS = fixtureCourses.map((course) => course.id);

export const isDemoCourseId = (courseId: number): boolean => DEMO_COURSE_IDS.includes(courseId);

const courseColors = ['#2563eb', '#0f766e', '#7c3aed'];

const toDashboardCard = (course: Course, index: number): DashboardCard => ({
  id: course.id,
  longName: course.name,
  shortName: course.name,
  originalName: course.name,
  courseCode: course.course_code || course.name,
  assetString: `course_${course.id}`,
  href: `/courses/${course.id}`,
  term: course.term?.name ?? '',
  subtitle: course.term?.name?.replace(/^\d{4}年度/, '') ?? '',
  enrollmentState: course.enrollment_state ?? 'active',
  enrollmentType: 'StudentEnrollment',
  observee: null,
  isFavorited: index < 2,
  isK5Subject: false,
  isHomeroom: false,
  useClassicFont: false,
  canManage: false,
  canReadAnnouncements: true,
  image: course.image_download_url ?? null,
  color: courseColors[index % courseColors.length],
  position: index + 1,
  published: true,
  links: [],
  canChangeCoursePublishState: false,
  defaultView: (course as any).default_view ?? 'modules',
  pagesUrl: `/courses/${course.id}/pages`,
  frontPageTitle: null,
  name: course.course_code || course.name,
  image_download_url: course.image_download_url,
});

export const mockCourses: Course[] = fixtureCourses;

export const mockDashboardCards: DashboardCard[] = mockCourses.map(toDashboardCard);

export const mockCourseColors: UserColors = {
  ...Object.fromEntries(mockCourses.map((course, index) => [
    `course_${course.id}`,
    courseColors[index % courseColors.length],
  ])),
};

export const mockAnnouncements: Announcement[] = fixtureAnnouncements;

export const mockAssignments: Assignment[] = fixtureAssignments;

export const mockPastAssignments: Assignment[] = mockAssignments
  .filter((assignment) => assignment.has_submitted_submissions)
  .slice(0, 3);

export const mockTodoItems: TodoItem[] = mockAssignments.slice(0, 2).map((assignment) => ({
  type: 'submitting',
  assignment,
  context_type: 'Course',
  course_id: assignment.course_id,
  html_url: `https://lms.keio.jp/courses/${assignment.course_id}/assignments/${assignment.id}`,
  ignore: `https://lms.keio.jp/api/v1/users/self/todo/${assignment.id}/ignore`,
  ignore_permanently: `https://lms.keio.jp/api/v1/users/self/todo/${assignment.id}/ignore_permanently`,
}));

export const mockCalendarEvents: CalendarEvent[] = [
  ...mockAssignments.map((assignment) => {
    const course = mockDashboardCards.find((card) => card.id === assignment.course_id);

    return {
      id: `assignment_${assignment.id}`,
      title: assignment.name,
      start_at: assignment.due_at,
      end_at: assignment.due_at,
      context_code: `course_${assignment.course_id}`,
      context_name: course?.courseCode,
      workflow_state: 'active',
      html_url: assignment.html_url,
      all_day: false,
      all_day_date: null,
      type: 'assignment',
      assignment,
    } satisfies CalendarEvent;
  }),
];

export const mockUpcomingEvents: UpcomingEvent[] = mockAssignments.map((assignment) => ({
  id: assignment.id,
  title: assignment.name,
  description: assignment.description ?? undefined,
  start_at: assignment.due_at,
  end_at: assignment.due_at,
  html_url: assignment.html_url ?? `https://lms.keio.jp/courses/${assignment.course_id}/assignments/${assignment.id}`,
  context_type: 'Course',
  context_id: assignment.course_id,
  assignment,
  type: 'assignment',
}));

export const mockPlannerItems: PlannerItem[] = mockAssignments.map((assignment, index) => ({
  context_type: 'Course',
  course_id: assignment.course_id,
  context_name: mockDashboardCards.find((course) => course.id === assignment.course_id)?.courseCode,
  plannable_id: assignment.id,
  plannable_type: 'assignment',
  plannable_date: assignment.due_at,
  planner_override: null,
  html_url: assignment.html_url,
  new_activity: index === 0,
  submissions: {submitted: assignment.has_submitted_submissions},
  plannable: {
    ...assignment,
    title: assignment.name,
    todo_date: assignment.due_at,
  },
}));

export const mockCurrentUser: User = {
  ...(userProfileJson as any),
  created_at: (userProfileJson as any).created_at ?? '2024-09-01T00:00:00Z',
  sortable_name: (userProfileJson as any).sortable_name ?? (userProfileJson as any).name,
  short_name: (userProfileJson as any).short_name ?? (userProfileJson as any).name,
  last_name: (userProfileJson as any).last_name ?? '',
  first_name: (userProfileJson as any).first_name ?? '',
  locale: (userProfileJson as any).locale ?? null,
  effective_locale: (userProfileJson as any).effective_locale ?? 'ja',
  permissions: {
    can_update_name: false,
    can_update_avatar: false,
    limit_parent_app_web_access: false,
  },
};

export const mockEnrollment: Enrollment = fixtureEnrollments[0] ?? {
  id: 990001,
  course_id: mockCourses[0].id,
  course_section_id: 990101,
  enrollment_state: 'active',
  type: 'StudentEnrollment',
  role: 'StudentEnrollment',
  role_id: 3,
  user_id: mockCurrentUser.id,
  html_url: `https://lms.keio.jp/courses/${mockCourses[0].id}/users/${mockCurrentUser.id}`,
  user: {
    id: mockCurrentUser.id,
    name: mockCurrentUser.name,
    sortable_name: mockCurrentUser.sortable_name,
    short_name: mockCurrentUser.short_name,
  },
  last_activity_at: null,
  total_activity_time: 0,
  created_at: '2024-09-01T00:00:00Z',
  updated_at: '2024-09-01T00:00:00Z',
};

export const mockSubmissions: Submission[] = [
  {
    id: 991001,
    assignment_id: (mockPastAssignments[0] ?? mockAssignments[0]).id,
    user_id: mockCurrentUser.id,
    submitted_at: '2024-09-29T08:00:00Z',
    grade: '9',
    score: 9,
    workflow_state: 'graded',
    late: false,
    excused: false,
    missing: false,
    late_policy_status: null,
    points_deducted: null,
    grading_period_id: null,
    assignment: mockPastAssignments[0] ?? mockAssignments[0],
  },
];

export const mockPage: Page = {
  page_id: 970101,
  url: 'demo-page',
  title: 'デモページ',
  created_at: '2024-09-01T00:00:00Z',
  updated_at: '2025-01-10T00:00:00Z',
  body: '<h2>デモ教材</h2><p>これはApp Store審査用の架空教材ページです。実際の授業・LMSには接続していません。</p>',
  published: true,
  html_url: 'https://lms.keio.jp/courses/910001/pages/demo-page',
};

export const mockPlannerOverride = (item: PlannerItem, markedComplete: boolean): PlannerOverride => ({
  id: Number(`${item.plannable_id}${markedComplete ? 1 : 0}`),
  plannable_type: item.plannable_type,
  plannable_id: item.plannable_id,
  assignment_id: item.plannable_type === 'assignment' ? item.plannable_id : undefined,
  user_id: mockCurrentUser.id,
  workflow_state: 'active',
  marked_complete: markedComplete,
  dismissed: false,
  created_at: '2026-04-01T00:00:00Z',
  updated_at: '2026-04-01T00:00:00Z',
  deleted_at: null,
});

export const mockConversations: Conversation[] = [
  {
    id: 'demo-conversation-1',
    subject: '次回授業について',
    workflow_state: 'unread',
    last_message: '次回は発表資料のドラフトを持参してください。',
    last_message_at: '2025-01-17T09:15:00Z',
    last_authored_message: null,
    last_authored_message_at: null,
    message_count: 2,
    subscribed: true,
    private: false,
    starred: false,
    properties: [],
    audience: ['demo-teacher'],
    audience_contexts: {
      courses: {
        '910004': ['demo-teacher'],
      },
      groups: {},
    },
    avatar_url: '',
    participants: [
      {
        id: 'demo-teacher',
        name: 'Demo Teacher',
        full_name: 'Demo Teacher',
      },
      {
        id: String(mockCurrentUser.id),
        name: mockCurrentUser.name,
        full_name: mockCurrentUser.name,
      },
    ],
    visible: true,
    context_name: '創造的思考ワークショップ',
  },
];

export const mockConversationDetails: ConversationDetail[] = mockConversations.map((conversation) => ({
  ...conversation,
  messages: [
    {
      id: 'demo-message-1',
      created_at: '2025-01-17T09:10:00Z',
      body: '<p>次回は発表資料のドラフトを持参してください。</p>',
      author_id: 'demo-teacher',
      generated: false,
      participating_user_ids: conversation.participants.map((participant) => participant.id),
    },
    {
      id: 'demo-message-2',
      created_at: '2025-01-17T09:15:00Z',
      body: '<p>確認しました。準備しておきます。</p>',
      author_id: String(mockCurrentUser.id),
      generated: false,
      participating_user_ids: conversation.participants.map((participant) => participant.id),
    },
  ],
}));

type MockRequestConfig = {
  params?: Record<string, any>;
};

const normalizeMockPath = (url: string): string => {
  try {
    const parsedUrl = new URL(url, 'https://lms.keio.jp');
    return parsedUrl.pathname.replace(/^\/api\/v1/, '') || '/';
  } catch {
    return url.replace(/^https:\/\/lms\.keio\.jp\/api\/v1/, '');
  }
};

const numberParam = (value: string | undefined): number | null => {
  if (!value) {
    return null;
  }

  const numberValue = Number(value);
  return Number.isNaN(numberValue) ? null : numberValue;
};

const mockModulesForCourse = (courseId: number): Module[] => {
  return fixtureModulesByCourseId.get(courseId) ?? [];
};

const mockAssignmentsForCourse = (courseId: number): Assignment[] => {
  return fixtureAssignmentsByCourseId.get(courseId) ?? [];
};

const mockEnrollmentsForCourse = (courseId: number): Enrollment[] => {
  return fixtureEnrollments.filter((enrollment) => enrollment.course_id === courseId);
};

const mockEnrollmentsForUser = (userId: number): Enrollment[] => {
  return fixtureEnrollments.filter((enrollment) => enrollment.user_id === userId);
};

const findModuleItem = (courseId: number, predicate: (item: any) => boolean): any | undefined => {
  for (const module of mockModulesForCourse(courseId)) {
    const item = module.items?.find(predicate);
    if (item) {
      return item;
    }
  }

  return undefined;
};

const contextCodesFromParams = (params?: Record<string, any>): string[] | undefined => {
  const contextCodes = params?.context_codes ?? params?.['context_codes[]'];
  return Array.isArray(contextCodes) ? contextCodes : undefined;
};

const getMockApiResponseForPath = (path: string, config?: MockRequestConfig): unknown => {
  if (path === '/courses') {
    return mockCourses;
  }

  if (path === '/dashboard/dashboard_cards') {
    return mockDashboardCards;
  }

  if (path === '/users/self' || path === '/users/self/profile') {
    return mockCurrentUser;
  }

  if (path === '/users/self/colors') {
    return {custom_colors: mockCourseColors};
  }

  if (path === '/users/self/courses/recent') {
    return mockCourses.slice(0, 3);
  }

  if (path === '/users/self/favorites/courses') {
    const favoriteIds = new Set(mockDashboardCards.filter((course) => course.isFavorited).map((course) => course.id));
    return mockCourses.filter((course) => favoriteIds.has(course.id));
  }

  if (path === '/users/self/assignments') {
    return mockAssignments;
  }

  if (path === '/users/self/todo') {
    return mockTodoItems;
  }

  if (path === '/users/self/upcoming_events') {
    return mockUpcomingEvents;
  }

  if (path === '/users/self/enrollments') {
    const courseId = config?.params?.course_id;
    return courseId ? mockEnrollmentsForCourse(Number(courseId)) : fixtureEnrollments;
  }

  if (path === '/announcements') {
    const contextCodes = contextCodesFromParams(config?.params);
    return contextCodes
      ? mockAnnouncements.filter((announcement) => contextCodes.includes(announcement.context_code))
      : mockAnnouncements;
  }

  if (path === '/calendar_events') {
    const contextCodes = contextCodesFromParams(config?.params);
    return contextCodes
      ? mockCalendarEvents.filter((event) => contextCodes.includes(event.context_code))
      : mockCalendarEvents;
  }

  if (path === '/planner/items') {
    return mockPlannerItems;
  }

  if (path === '/conversations') {
    return mockConversations;
  }

  const conversationMatch = path.match(/^\/conversations\/([^/]+)$/);
  if (conversationMatch) {
    return mockConversationDetails.find((conversation) => conversation.id === conversationMatch[1])
      ?? mockConversationDetails[0];
  }

  const courseMatch = path.match(/^\/courses\/(\d+)$/);
  if (courseMatch) {
    const courseId = numberParam(courseMatch[1]);
    return mockCourses.find((course) => course.id === courseId) ?? mockCourses[0];
  }

  const courseAssignmentsMatch = path.match(/^\/courses\/(\d+)\/assignments$/);
  if (courseAssignmentsMatch) {
    const courseId = numberParam(courseAssignmentsMatch[1]);
    return courseId ? mockAssignmentsForCourse(courseId) : [];
  }

  const courseAssignmentMatch = path.match(/^\/courses\/(\d+)\/assignments\/(\d+)$/);
  if (courseAssignmentMatch) {
    const courseId = numberParam(courseAssignmentMatch[1]);
    const assignmentId = numberParam(courseAssignmentMatch[2]);
    return mockAssignments.find((assignment) => (
      assignment.course_id === courseId && assignment.id === assignmentId
    ));
  }

  const courseSubmissionsMatch = path.match(/^\/courses\/(\d+)\/students\/submissions$/);
  if (courseSubmissionsMatch) {
    const courseId = numberParam(courseSubmissionsMatch[1]);
    const assignmentIds = config?.params?.assignment_ids as number[] | undefined;
    return mockSubmissions.filter((submission) => {
      if (submission.assignment.course_id !== courseId) {
        return false;
      }

      return !assignmentIds || assignmentIds.includes(submission.assignment_id);
    });
  }

  const courseAnnouncementsMatch = path.match(/^\/courses\/(\d+)\/discussion_topics$/);
  if (courseAnnouncementsMatch) {
    return mockAnnouncements.filter((announcement) => (
      announcement.context_code === `course_${courseAnnouncementsMatch[1]}`
    ));
  }

  const courseAnnouncementMatch = path.match(/^\/courses\/(\d+)\/discussion_topics\/(\d+)$/);
  if (courseAnnouncementMatch) {
    return mockAnnouncements.find((announcement) => (
      announcement.context_code === `course_${courseAnnouncementMatch[1]}`
      && announcement.id === Number(courseAnnouncementMatch[2])
    )) ?? mockAnnouncements[0];
  }

  const courseModulesMatch = path.match(/^\/courses\/(\d+)\/modules$/);
  if (courseModulesMatch) {
    return mockModulesForCourse(Number(courseModulesMatch[1]));
  }

  const courseModuleMatch = path.match(/^\/courses\/(\d+)\/modules\/(\d+)$/);
  if (courseModuleMatch) {
    return mockModulesForCourse(Number(courseModuleMatch[1]))
      .find((module) => module.id === Number(courseModuleMatch[2]));
  }

  const courseModuleItemsMatch = path.match(/^\/courses\/(\d+)\/modules\/(\d+)\/items$/);
  if (courseModuleItemsMatch) {
    return mockModulesForCourse(Number(courseModuleItemsMatch[1]))
      .find((module) => module.id === Number(courseModuleItemsMatch[2]))?.items ?? [];
  }

  const courseModuleItemMatch = path.match(/^\/courses\/(\d+)\/modules\/(\d+)\/items\/(\d+)$/);
  if (courseModuleItemMatch) {
    return mockModulesForCourse(Number(courseModuleItemMatch[1]))
      .find((module) => module.id === Number(courseModuleItemMatch[2]))
      ?.items?.find((item) => item.id === Number(courseModuleItemMatch[3]));
  }

  const pageMatch = path.match(/^\/courses\/(\d+)\/pages\/(.+)$/);
  if (pageMatch) {
    const courseId = Number(pageMatch[1]);
    const pageUrl = decodeURIComponent(pageMatch[2]);
    const pageItem = findModuleItem(courseId, (item) => item.type === 'Page' && item.page_url === pageUrl);
    return {
      ...mockPage,
      url: pageUrl,
      title: pageItem?.title ?? mockPage.title,
      html_url: `https://lms.keio.jp/courses/${courseId}/pages/${pageUrl}`,
      body: `<h2>${pageItem?.title ?? mockPage.title}</h2><p>デモモードではページ本文の通信を行わず、保存済みモジュール項目に基づく表示のみを行います。</p>`,
    };
  }

  const courseEnrollmentsMatch = path.match(/^\/courses\/(\d+)\/enrollments$/);
  if (courseEnrollmentsMatch) {
    return mockEnrollmentsForCourse(Number(courseEnrollmentsMatch[1]));
  }

  const userEnrollmentsMatch = path.match(/^\/users\/(\d+)\/enrollments$/);
  if (userEnrollmentsMatch) {
    return mockEnrollmentsForUser(Number(userEnrollmentsMatch[1]));
  }

  const enrollmentMatch = path.match(/^\/accounts\/(\d+)\/enrollments\/(\d+)$/);
  if (enrollmentMatch) {
    return fixtureEnrollments.find((enrollment) => enrollment.id === Number(enrollmentMatch[2]));
  }

  return undefined;
};

export const getMockApiResponse = (url: string, config?: MockRequestConfig): unknown => {
  return getMockApiResponseForPath(normalizeMockPath(url), config);
};

export const getMockApiMutationResponse = (
  method: 'post' | 'put' | 'delete',
  url: string,
  data?: any
): { handled: boolean; data?: unknown } => {
  const path = normalizeMockPath(url);

  if (method === 'put' && /^\/courses\/\d+\/discussion_topics\/\d+\/read$/.test(path)) {
    return {handled: true};
  }

  if (method === 'post' && path === '/planner/overrides') {
    return {
      handled: true,
      data: mockPlannerOverride({
        plannable_id: data?.plannable_id,
        plannable_type: data?.plannable_type,
        plannable_date: null,
      }, data?.marked_complete ?? false),
    };
  }

  const plannerOverrideMatch = path.match(/^\/planner\/overrides\/(\d+)$/);
  if (method === 'put' && plannerOverrideMatch) {
    const item = mockPlannerItems.find((plannerItem) => plannerItem.planner_override?.id === Number(plannerOverrideMatch[1]))
      ?? mockPlannerItems[0];
    return {handled: true, data: mockPlannerOverride(item, data?.marked_complete ?? false)};
  }

  const conversationMessageMatch = path.match(/^\/conversations\/([^/]+)\/add_message$/);
  if (method === 'post' && conversationMessageMatch) {
    const conversation = mockConversationDetails.find((detail) => detail.id === conversationMessageMatch[1])
      ?? mockConversationDetails[0];
    return {
      handled: true,
      data: {
        ...conversation,
        messages: [
          ...conversation.messages,
          {
            id: `demo-message-${conversation.messages.length + 1}`,
            created_at: new Date().toISOString(),
            body: data?.body ?? '',
            author_id: String(mockCurrentUser.id),
            generated: false,
            participating_user_ids: conversation.participants.map((participant) => participant.id),
          },
        ],
      },
    };
  }

  return {handled: false};
};
