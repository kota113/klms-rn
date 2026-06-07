import {apiClient} from './client';

/**
 * Interface for Conversation data
 */
export interface Conversation {
  id: string;
  subject: string;
  workflow_state: 'read' | 'unread' | 'archived';
  last_message: string | null;
  last_message_at: string | null;
  last_authored_message: string | null;
  last_authored_message_at: string | null;
  message_count: number;
  subscribed: boolean;
  private: boolean;
  starred: boolean;
  properties: string[];
  audience: string[];
  audience_contexts: {
    courses: Record<string, string[]>;
    groups: Record<string, string[]>;
  };
  avatar_url: string;
  participants: ConversationParticipant[];
  visible: boolean;
  context_name: string | null;
}

export interface ConversationParticipant {
  id: string;
  name: string;
  full_name: string;
  avatar_url?: string;
}

export interface ConversationMessage {
  id: string;
  created_at: string;
  body: string;
  author_id: string;
  generated: boolean;
  media_comment?: {
    media_type: string;
    media_id: string;
    display_name: string | null;
    url: string;
    'content-type': string;
  };
  forwarded_messages?: ConversationMessage[];
  attachments?: {
    id: string;
    display_name: string;
    filename: string;
    url: string;
    'content-type': string;
  }[];
  participating_user_ids: string[];
}

export interface ConversationDetail extends Conversation {
  messages: ConversationMessage[];
}

export interface ConversationsPage {
  data: Conversation[];
  nextUrl: string | null;
}

/**
 * Service for interacting with the Conversations API endpoints
 */
export const conversationsService = {
  /**
   * Get the list of conversations for the current user, most recent first
   * @param params - Optional query parameters
   * @returns Promise with the list of conversations
   */
  getConversations: async (params?: {
    scope?: 'unread' | 'starred' | 'archived';
    filter?: string[];
    filter_mode?: 'and' | 'or';
    interleave_submissions?: boolean;
    include_all_conversation_ids?: boolean;
    include?: ('participant_avatars')[];
    per_page?: number;
  }): Promise<Conversation[]> => {
    return apiClient.getPaginated('/conversations', {params});
  },

  getConversationsPage: async (
    urlOrParams?: string | {
      scope?: 'unread' | 'starred' | 'archived';
      filter?: string[];
      filter_mode?: 'and' | 'or';
      interleave_submissions?: boolean;
      include_all_conversation_ids?: boolean;
      include?: ('participant_avatars')[];
      per_page?: number;
    }
  ): Promise<ConversationsPage> => {
    if (typeof urlOrParams === 'string') {
      return apiClient.getPagedResponse<Conversation>(urlOrParams);
    }
    return apiClient.getPagedResponse<Conversation>('/conversations', {params: urlOrParams});
  },

  getConversation: async (id: string): Promise<ConversationDetail> => {
    return apiClient.get(`/conversations/${id}`);
  },

  addMessage: async (id: string, body: string): Promise<ConversationDetail> => {
    return apiClient.post(`/conversations/${id}/add_message`, {body});
  },
};
