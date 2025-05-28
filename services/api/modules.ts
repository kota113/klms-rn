import {apiClient} from './client';

/**
 * Interface for Module data
 */
export interface Module {
  id: number;
  name: string;
  position: number;
  unlock_at: string | null;
  require_sequential_progress: boolean;
  publish_final_grade: boolean;
  prerequisite_module_ids: number[];
  state: 'active' | 'deleted';
  completed_at: string | null;
  items_count: number;
  items_url: string;
  items: ModuleItem[];
}

/**
 * Interface for Module Item data
 */
export interface ModuleItem {
  id: number;
  module_id: number;
  position: number;
  title: string;
  indent: number;
  type: 'File' | 'Page' | 'Discussion' | 'Assignment' | 'Quiz' | 'SubHeader' | 'ExternalUrl' | 'ExternalTool';
  content_id: number;
  html_url: string;
  url: string;
  page_url?: string;
  external_url?: string;
  new_tab?: boolean;
  completion_requirement?: {
    type: 'must_view' | 'must_submit' | 'must_contribute' | 'min_score';
    min_score?: number;
    completed?: boolean;
  };
  content_details?: {
    due_at?: string;
    unlock_at?: string;
    lock_at?: string;
    points_possible?: number;
  };
}

/**
 * Service for interacting with the Modules API endpoints
 */
export const modulesService = {
  /**
   * Get a list of modules for a course
   * @param courseId - The ID of the course
   * @param params - Optional query parameters
   * @returns Promise with the list of modules
   */
  getModules: async (courseId: number, params?: {
    include?: string[];
    search_term?: string;
    student_id?: number;
  }): Promise<Module[]> => {
    return apiClient.get(`/courses/${courseId}/modules`, {params});
  },

  /**
   * Get a single module by ID
   * @param courseId - The ID of the course
   * @param moduleId - The ID of the module
   * @param params - Optional query parameters
   * @returns Promise with the module data
   */
  getModule: async (courseId: number, moduleId: number, params?: {
    include?: string[];
    student_id?: number;
  }): Promise<Module> => {
    return apiClient.get(`/courses/${courseId}/modules/${moduleId}`, {params});
  },

  /**
   * Get a list of module items for a module
   * @param courseId - The ID of the course
   * @param moduleId - The ID of the module
   * @param params - Optional query parameters
   * @returns Promise with the list of module items
   */
  getModuleItems: async (courseId: number, moduleId: number, params?: {
    include?: string[];
    search_term?: string;
    student_id?: number;
  }): Promise<ModuleItem[]> => {
    return apiClient.get(`/courses/${courseId}/modules/${moduleId}/items`, {params});
  },

  /**
   * Get a single module item by ID
   * @param courseId - The ID of the course
   * @param moduleId - The ID of the module
   * @param itemId - The ID of the module item
   * @param params - Optional query parameters
   * @returns Promise with the module item data
   */
  getModuleItem: async (courseId: number, moduleId: number, itemId: number, params?: {
    include?: string[];
    student_id?: number;
  }): Promise<ModuleItem> => {
    return apiClient.get(`/courses/${courseId}/modules/${moduleId}/items/${itemId}`, {params});
  }
};
