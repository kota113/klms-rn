import {apiClient} from './client';

/**
 * Interface for Assignment data
 */
export interface Assignment {
  id: number;
  name: string;
  description: string | null;
  created_at?: string;
  updated_at?: string;
  due_at: string | null;
  lock_at: string | null;
  unlock_at: string | null;
  has_overrides?: boolean;
  all_dates?: AssignmentDate[];
  points_possible: number;
  course_id: number;
  html_url?: string;
  submissions_download_url?: string;
  due_date_required?: boolean;
  submission_types: string[];
  has_submitted_submissions: boolean;
  allowed_extensions: string[];
  assignment_group_id: number;
  position: number;
  grading_type?: 'pass_fail' | 'percent' | 'letter_grade' | 'gpa_scale' | 'points' | string;
  grading_standard_id?: number | null;
  grade_group_students_individually: boolean;
  published: boolean;
  unpublishable?: boolean;
  only_visible_to_overrides?: boolean;
  locked_for_user?: boolean;
  lock_explanation?: string;
  quiz_id?: number;
  anonymous_submissions?: boolean;
  peer_reviews?: boolean;
  automatic_peer_reviews?: boolean;
  peer_review_count?: number;
  peer_reviews_assign_at?: string | null;
  intra_group_peer_reviews?: boolean;
  group_category_id?: number | null;
  needs_grading_count?: number;
  post_to_sis?: boolean;
  integration_id?: string;
  omit_from_final_grade?: boolean;
  hide_in_gradebook?: boolean;
  moderated_grading?: boolean;
  grader_count?: number;
  final_grader_id?: number;
  grader_comments_visible_to_graders?: boolean;
  graders_anonymous_to_graders?: boolean;
  grader_names_visible_to_final_grader?: boolean;
  anonymous_grading?: boolean;
  allowed_attempts?: number;
  post_manually?: boolean;
  can_submit?: boolean;
  annotatable_attachment_id?: number;
  anonymize_students?: boolean;
  require_lockdown_browser?: boolean;
  important_dates?: boolean;
  muted?: boolean;
  anonymous_peer_reviews?: boolean;
  anonymous_instructor_annotations?: boolean;
  graded_submissions_exist?: boolean;
  is_quiz_assignment?: boolean;
  in_closed_grading_period?: boolean;
  can_duplicate?: boolean;
  workflow_state?: string;
  submission?: Submission;
  score_statistics?: ScoreStatistic;
  overrides?: AssignmentOverride[];
  rubric?: RubricCriteria[];
  rubric_settings?: {
    points_possible?: string | number;
  };
  use_rubric_for_grading?: boolean;
}

export interface AssignmentDate {
  id?: number;
  base?: boolean;
  title?: string;
  due_at?: string | null;
  unlock_at?: string | null;
  lock_at?: string | null;
}

export interface AssignmentOverride {
  id: number;
  assignment_id?: number;
  title?: string;
  due_at?: string | null;
  unlock_at?: string | null;
  lock_at?: string | null;
  student_ids?: number[];
  group_id?: number;
  course_section_id?: number;
}

export interface ScoreStatistic {
  min?: number;
  max?: number;
  mean?: number;
  upper_q?: number;
  median?: number;
  lower_q?: number;
}

export interface RubricCriteria {
  id?: string;
  description?: string;
  long_description?: string;
  points?: number;
  ratings?: Array<{
    id?: string;
    description?: string;
    long_description?: string;
    points?: number;
  }>;
}

/**
 * Interface for Submission data
 */
export interface Submission {
  id: number;
  assignment_id: number;
  user_id: number;
  submitted_at: string | null;
  grade: string | null;
  score: number | null;
  workflow_state: 'submitted' | 'unsubmitted' | 'graded' | 'pending_review';
  late: boolean;
  excused: boolean;
  missing: boolean;
  late_policy_status: string | null;
  points_deducted: number | null;
  grading_period_id: number | null;
  assignment: Assignment;
}

/**
 * Interface for Todo Item data
 */
export interface TodoItem {
  type: string;
  assignment?: Assignment;
  quiz?: any;
  context_type: string;
  course_id: number;
  html_url: string;
  ignore: string;
  ignore_permanently: string;
}

/**
 * Interface for Upcoming Event data
 */
export interface UpcomingEvent {
  id: number;
  title: string;
  description?: string;
  start_at: string | null;
  end_at: string | null;
  html_url: string;
  context_type: string;
  context_id: number;
  assignment?: Assignment;
  type?: string;
}

/**
 * Service for interacting with the Assignments API endpoints
 */
export const assignmentsService = {
  /**
   * Get a list of assignments for a course
   * @param courseId - The ID of the course
   * @param params - Optional query parameters
   * @returns Promise with the list of assignments
   */
  getAssignments: async (courseId: number, params?: {
    include?: string[];
    search_term?: string;
    override_assignment_dates?: boolean;
    needs_grading_count_by_section?: boolean;
    bucket?: 'past' | 'overdue' | 'undated' | 'ungraded' | 'unsubmitted' | 'upcoming' | 'future';
    assignment_ids?: number[];
    order_by?: 'position' | 'name' | 'due_at';
    post_to_sis?: boolean;
  }): Promise<Assignment[]> => {
    return apiClient.get(`/courses/${courseId}/assignments`, {params});
  },

  /**
   * Get a single assignment by ID
   * @param courseId - The ID of the course
   * @param assignmentId - The ID of the assignment
   * @param params - Optional query parameters
   * @returns Promise with the assignment data
   */
  getAssignment: async (courseId: number, assignmentId: number, params?: {
    include?: string[];
    override_assignment_dates?: boolean;
    needs_grading_count_by_section?: boolean;
    all_dates?: boolean;
  }): Promise<Assignment> => {
    return apiClient.get(`/courses/${courseId}/assignments/${assignmentId}`, {params});
  },

  /**
   * Get submissions for a course
   * @param courseId - The ID of the course
   * @param params - Optional query parameters
   * @returns Promise with the list of submissions
   */
  getSubmissions: async (courseId: number, params?: {
    student_ids?: string[] | 'all';
    assignment_ids?: number[];
    grouped?: boolean;
    include?: string[];
    workflow_state?: 'submitted' | 'unsubmitted' | 'graded' | 'pending_review';
  }): Promise<Submission[]> => {
    return apiClient.get(`/courses/${courseId}/students/submissions`, {params});
  },

  /**
   * Get all assignments for the current user
   * @returns Promise with the list of assignments
   */
  getUserAssignments: async (): Promise<Assignment[]> => {
    return apiClient.get('/users/self/assignments');
  },

  /**
   * Get todo items for the current user
   * @param params - Optional query parameters
   * @returns Promise with the list of todo items
   */
  getTodoItems: async (params?: {
    include?: string[];
  }): Promise<TodoItem[]> => {
    return apiClient.get('/users/self/todo', {params});
  },

  /**
   * Get upcoming assignments for the current user
   * @param params - Optional query parameters
   * @returns Promise with the list of assignments extracted from upcoming events
   */
  getUpcomingAssignments: async (params?: {
    include?: string[];
  }): Promise<Assignment[]> => {
    // Get upcoming events directly from the API
    const upcomingEvents = await apiClient.get<UpcomingEvent[]>('/users/self/upcoming_events', {params});

    // Extract assignments from upcoming events
    return upcomingEvents
      .filter(event => event.assignment)
      .map(event => event.assignment as Assignment);
  }
};
