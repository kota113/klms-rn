import {apiClient} from './client';
import type {Assignment} from './assignments';

export type PlannerPlannableType =
  | 'announcement'
  | 'assignment'
  | 'discussion_topic'
  | 'quiz'
  | 'wiki_page'
  | 'planner_note'
  | 'calendar_event'
  | 'assessment_request'
  | 'sub_assignment'
  | string;

export interface PlannerOverride {
  id: number;
  plannable_type: PlannerPlannableType;
  plannable_id: number;
  user_id?: number;
  assignment_id?: number;
  workflow_state?: string;
  marked_complete: boolean;
  dismissed: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface PlannerItem {
  context_type?: string;
  course_id?: number;
  context_name?: string;
  plannable_id: number;
  plannable_type: PlannerPlannableType;
  plannable_date: string | null;
  planner_override?: PlannerOverride | null;
  html_url?: string;
  new_activity?: boolean;
  submissions?: unknown;
  plannable?: (Partial<Assignment> & {
    id?: number;
    title?: string;
    name?: string;
    todo_date?: string | null;
    due_at?: string | null;
    html_url?: string;
  }) | null;
}

export const plannerService = {
  getPlannerItems: async (params?: {
    start_date?: string;
    end_date?: string;
    context_codes?: string[];
    include?: 'concluded'[];
    observed_user_id?: string;
    filter?: 'new_activity';
  }): Promise<PlannerItem[]> => {
    return apiClient.getPaginated('/planner/items', {params});
  },

  createPlannerOverride: async (params: {
    plannable_type: PlannerPlannableType;
    plannable_id: number;
    marked_complete?: boolean;
    dismissed?: boolean;
  }): Promise<PlannerOverride> => {
    return apiClient.post('/planner/overrides', params);
  },

  updatePlannerOverride: async (
    overrideId: number,
    params: {
      marked_complete?: boolean;
      dismissed?: boolean;
    }
  ): Promise<PlannerOverride> => {
    return apiClient.put(`/planner/overrides/${overrideId}`, params);
  },

  setPlannerItemComplete: async (item: PlannerItem, markedComplete: boolean): Promise<PlannerOverride> => {
    if (item.planner_override?.id) {
      return plannerService.updatePlannerOverride(item.planner_override.id, {
        marked_complete: markedComplete,
      });
    }

    return plannerService.createPlannerOverride({
      plannable_type: item.plannable_type,
      plannable_id: item.plannable_id,
      marked_complete: markedComplete,
    });
  },
};
