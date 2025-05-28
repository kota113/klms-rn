import {apiClient} from './client';

/**
 * Interface for User data
 */
export interface User {
  id: number;
  name: string;
  created_at: string;
  sortable_name: string;
  short_name: string;
  avatar_url: string;
  last_name: string;
  first_name: string;
  locale: string | null;
  effective_locale: string;
  permissions: {
    can_update_name: boolean;
    can_update_avatar: boolean;
    limit_parent_app_web_access: boolean;
  };
}

/**
 * Interface for User Colors data
 */
export interface UserColors {
  [key: string]: string; // Maps asset_string (e.g., "course_123") to hex color code
}

/**
 * Service for interacting with the Users API endpoints
 */
export const usersService = {
  /**
   * Get the current user's information
   * @param params - Optional query parameters
   * @returns Promise with the user data
   */
  getCurrentUser: async (params?: {
    include?: string[];
  }): Promise<User> => {
    return apiClient.get('/users/self', {params});
  },

  /**
   * Get all custom colors for the current user
   * @returns Promise with the user colors data
   */
  getUserColors: async (): Promise<UserColors> => {
    const response = await apiClient.get<{ custom_colors: UserColors }>('/users/self/colors');
    return response.custom_colors || {};
  },

  /**
   * Get a specific custom color for the current user
   * @param assetString - The asset string in the format 'context_id', e.g., 'course_123'
   * @returns Promise with the color data
   */
  getUserColor: async (assetString: string): Promise<{ hexcode: string }> => {
    const response = await apiClient.get<{ custom_colors: { [key: string]: string } }>('/users/self/colors');
    const hexcode = response.custom_colors?.[assetString] || '';
    return {hexcode};
  },

  /**
   * Format a course ID into an asset string for colors API
   * @param courseId - The course ID
   * @returns The formatted asset string
   */
  formatCourseAssetString: (courseId: number | string): string => {
    return `course_${courseId}`;
  }
};
