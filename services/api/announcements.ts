import {apiClient} from './client';

/**
 * Interface for Announcement data
 */
export interface Announcement {
  id: number;
  title: string;
  message: string;
  posted_at: string;
  delayed_post_at: string | null;
  author: {
    id: number;
    display_name: string;
    avatar_image_url: string;
  };
  context_code: string;
  read_state: 'read' | 'unread';
  html_url: string;
}

/**
 * Helper function to format course IDs into context codes
 * @param courseIds - Array of course IDs
 * @returns Array of context codes in the format "course_[courseId]"
 */
export const formatContextCodes = (courseIds: number[]): string[] => {
  return courseIds.map(id => `course_${id}`);
};

/**
 * Service for interacting with the Announcements API endpoints
 */
export const announcementsService = {
  /**
   * Get a list of announcements for a course
   * @param courseId - The ID of the course
   * @param params - Optional query parameters
   * @returns Promise with the list of announcements
   */
  getCourseAnnouncements: async (courseId: number, params?: {
    start_date?: string;
    end_date?: string;
    active_only?: boolean;
    include?: string[];
    latest_only?: boolean;
  }): Promise<Announcement[]> => {
    return apiClient.get(`/courses/${courseId}/discussion_topics`, {
      params: {
        ...params,
        only_announcements: true
      }
    });
  },

  /**
   * Get a single announcement by ID
   * @param courseId - The ID of the course
   * @param announcementId - The ID of the announcement
   * @returns Promise with the announcement data
   */
  getCourseAnnouncement: async (courseId: number, announcementId: number): Promise<Announcement> => {
    return apiClient.get(`/courses/${courseId}/discussion_topics/${announcementId}`);
  },

  /**
   * Get announcements for multiple courses
   * @param contextCodes - Required array of context codes in the format "course_[courseId]" or course IDs that will be formatted
   * @param params - Optional query parameters
   * @returns Promise with the list of announcements
   */
  getAnnouncements: async (
    contextCodes: string[] | number[],
    params?: {
      start_date?: string;
      end_date?: string;
      active_only?: boolean;
      include?: string[];
      latest_only?: boolean;
    }
  ): Promise<Announcement[]> => {
    // Format context codes if they are numbers (course IDs)
    const formattedContextCodes = Array.isArray(contextCodes) && typeof contextCodes[0] === 'number'
      ? formatContextCodes(contextCodes as number[])
      : contextCodes;

    return apiClient.get('/announcements', {
      params: {
        ...params,
        'context_codes[]': formattedContextCodes
      }
    });
  }
};
