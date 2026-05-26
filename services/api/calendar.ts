import {apiClient} from './client';
import type {Assignment} from './assignments';

export interface CalendarEvent {
  id: number | string;
  title: string;
  start_at: string | null;
  end_at: string | null;
  description?: string | null;
  location_name?: string | null;
  location_address?: string | null;
  context_code: string;
  context_name?: string;
  workflow_state?: string;
  html_url?: string;
  all_day_date?: string | null;
  all_day?: boolean;
  type?: string;
  assignment?: Assignment;
}

export const calendarService = {
  getCalendarEvents: async (params?: {
    type?: 'event' | 'assignment' | 'sub_assignment';
    start_date?: string;
    end_date?: string;
    undated?: boolean;
    all_events?: boolean;
    context_codes?: string[];
    excludes?: string[];
    includes?: string[];
  }): Promise<CalendarEvent[]> => {
    return apiClient.get('/calendar_events', {params});
  },
};
