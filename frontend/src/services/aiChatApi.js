import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

// AI sohbet listesi/geçmişi REST ile; mesaj gönderme ve canlı cevap socket ile (lib/socket.js).
export const aiChatApi = createApi({
  reducerPath: 'aiChatApi',
  baseQuery,
  tagTypes: ['AiConversations'],
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: (level) => `/ai/topics/${level}`,
    }),
    getConversations: builder.query({
      query: () => '/ai/conversations',
      providesTags: ['AiConversations'],
    }),
    getConversation: builder.query({
      query: (id) => `/ai/conversations/${id}`,
    }),
    createConversation: builder.mutation({
      query: (body) => ({ url: '/ai/conversations', method: 'POST', body }),
      invalidatesTags: ['AiConversations'],
    }),
    deleteConversation: builder.mutation({
      query: (id) => ({ url: `/ai/conversations/${id}`, method: 'DELETE' }),
      invalidatesTags: ['AiConversations'],
    }),
  }),
});

export const {
  useGetTopicsQuery,
  useGetConversationsQuery,
  useGetConversationQuery,
  useCreateConversationMutation,
  useDeleteConversationMutation,
} = aiChatApi;
