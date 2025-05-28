import {apiClient} from './client';

/**
 * Interface for Enrollment data
 */
export interface Enrollment {
  id: number;
  course_id: number;
  course_section_id: number;
  enrollment_state: 'active' | 'invited' | 'inactive' | 'completed' | 'rejected' | 'deleted';
  type: 'StudentEnrollment' | 'TeacherEnrollment' | 'TaEnrollment' | 'DesignerEnrollment' | 'ObserverEnrollment';
  role: string;
  role_id: number;
  user_id: number;
  html_url: string;
  grades?: {
    html_url: string;
    current_score: number;
    current_grade: string;
    final_score: number;
    final_grade: string;
    unposted_current_score?: number;
    unposted_current_grade?: string;
    unposted_final_score?: number;
    unposted_final_grade?: string;
  };
  user: {
    id: number;
    name: string;
    sortable_name: string;
    short_name: string;
  };
  last_activity_at: string | null;
  total_activity_time: number;
  created_at: string;
  updated_at: string;
}

/**
 * Service for interacting with the Enrollments API endpoints
 */
export const enrollmentsService = {
  /**
   * Get a list of enrollments for a course
   * @param courseId - The ID of the course
   * @param params - Optional query parameters
   * @returns Promise with the list of enrollments
   */
  getCourseEnrollments: async (courseId: number, params?: {
    type?: string[];
    state?: string[];
    include?: string[];
    user_id?: number;
    grading_period_id?: number;
  }): Promise<Enrollment[]> => {
    return apiClient.get(`/courses/${courseId}/enrollments`, {params});
  },

  /**
   * Get a list of enrollments for a user
   * @param userId - The ID of the user
   * @param params - Optional query parameters
   * @returns Promise with the list of enrollments
   */
  getUserEnrollments: async (userId: number, params?: {
    type?: string[];
    state?: string[];
    include?: string[];
    course_id?: number;
    grading_period_id?: number;
  }): Promise<Enrollment[]> => {
    return apiClient.get(`/users/${userId}/enrollments`, {params});
  },

  /**
   * Get a list of enrollments for the current user
   * @param params - Optional query parameters
   * @returns Promise with the list of enrollments
   */
  getSelfEnrollments: async (params?: {
    type?: string[];
    state?: string[];
    include?: string[];
    course_id?: number;
    grading_period_id?: number;
  }): Promise<Enrollment[]> => {
    return apiClient.get('/users/self/enrollments', {params});
  },

  /**
   * Get a single enrollment by ID
   * @param accountId - The ID of the account
   * @param enrollmentId - The ID of the enrollment
   * @returns Promise with the enrollment data
   */
  getEnrollment: async (accountId: number, enrollmentId: number): Promise<Enrollment> => {
    return apiClient.get(`/accounts/${accountId}/enrollments/${enrollmentId}`);
  }
};
