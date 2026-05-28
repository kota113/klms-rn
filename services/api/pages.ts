import {apiClient} from './client';

export interface Page {
  page_id: number;
  url: string;
  title: string;
  created_at?: string;
  updated_at?: string;
  body?: string;
  published?: boolean;
  html_url?: string;
}

export const pagesService = {
  getPage: async (courseId: number, urlOrId: string | number): Promise<Page> => {
    return apiClient.get(`/courses/${courseId}/pages/${encodeURIComponent(String(urlOrId))}`);
  },
};
