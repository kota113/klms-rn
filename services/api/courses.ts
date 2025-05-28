import {apiClient} from './client';

/**
 * Interface for Course data
 */
export interface Course {
  id: number;
  name: string;
  course_code: string;
  start_at: string | null;
  end_at: string | null;
  image_download_url?: string;
  syllabus_body?: string;
  public_description?: string;
}

/**
 * Interface for Dashboard Card data
 */
export interface DashboardCard {
  id: number;
  longName: string;
  shortName: string;
  originalName: string;
  courseCode: string;
  assetString: string;
  href: string;
  term: string;
  subtitle: string;
  enrollmentState: string;
  enrollmentType: string;
  observee: null | any;
  isFavorited: boolean;
  isK5Subject: boolean;
  isHomeroom: boolean;
  useClassicFont: boolean;
  canManage: boolean;
  canReadAnnouncements: boolean;
  image: null | string;
  color: null | string;
  position: null | number;
  published: boolean;
  links: Array<{
    css_class: string;
    icon: string;
    hidden: null | boolean;
    path: string;
    label: string;
  }>;
  canChangeCoursePublishState: boolean;
  defaultView: string;
  pagesUrl: string;
  frontPageTitle: null | string;
  // Maintain compatibility with existing code
  name: string; // Map to shortName for compatibility
  image_download_url?: string; // Keep for compatibility
}

/**
 * Service for interacting with the Courses API endpoints
 */
export const coursesService = {
  /**
   * Get a list of all courses for the current user
   * @param params - Optional query parameters
   * @returns Promise with the list of courses
   */
  getCourses: async (params?: {
    include?: string[];
    state?: 'unpublished' | 'available' | 'completed' | 'deleted';
    enrollment_state?: 'active' | 'invited' | 'creation_pending' | 'rejected' | 'completed' | 'inactive';
  }): Promise<Course[]> => {
    return apiClient.get('/courses', {params});
  },

  /**
   * Get a single course by ID
   * @param courseId - The ID of the course
   * @param params - Optional query parameters
   * @returns Promise with the course data
   */
  getCourse: async (courseId: number, params?: { include?: string[] }): Promise<Course> => {
    return apiClient.get(`/courses/${courseId}`, {params});
  },

  /**
   * Get the dashboard cards for the current user
   * @returns Promise with the dashboard cards data
   */
  getDashboardCards: async (): Promise<DashboardCard[]> => {
    const response = await apiClient.get<any[]>('/dashboard/dashboard_cards');

    // Map the response to the DashboardCard interface
    return response.map(card => ({
      ...card,
      // Set compatibility properties
      name: card.shortName || card.originalName,
      image_download_url: card.image || undefined // Use image property as image_download_url, set to undefined if null
    }));
  },

  /**
   * Get the recent courses for the current user
   * @returns Promise with the recent courses data
   */
  getRecentCourses: async (): Promise<Course[]> => {
    return apiClient.get('/users/self/courses/recent');
  },

  /**
   * Get the favorite courses for the current user
   * @returns Promise with the favorite courses data
   */
  getFavoriteCourses: async (): Promise<Course[]> => {
    return apiClient.get('/users/self/favorites/courses');
  }
};
