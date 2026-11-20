import { currentLanguage } from '@/i18n';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  prepareHeaders: (headers, { getState }) => {
    headers.set('Accept-Language', currentLanguage());
    const token = getState().auth.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  tagTypes: ['Me'],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => '/users/me',
      providesTags: ['Me'],
    }),
    // Tüm rozetler (profilde kazanılanlar ve henüz kazanılmayanlar birlikte gösterilir).
    getBadges: builder.query({
      query: () => '/badges',
    }),
    addProgress: builder.mutation({
      query: (payload) => ({ url: '/users/progress', method: 'POST', body: payload }),
      invalidatesTags: ['Me'],
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({ url: '/users/me', method: 'PATCH', body: payload }),
      invalidatesTags: ['Me'],
    }),
    // E-posta tercihleri: { emailReminders: boolean } (seri hatırlatma maili).
    updatePreferences: builder.mutation({
      query: (payload) => ({ url: '/users/me/preferences', method: 'PATCH', body: payload }),
      invalidatesTags: ['Me'],
    }),
    changePassword: builder.mutation({
      query: (payload) => ({ url: '/users/me/password', method: 'PATCH', body: payload }),
      invalidatesTags: ['Me'],
    }),
    deleteAccount: builder.mutation({
      query: (payload) => ({ url: '/users/me', method: 'DELETE', body: payload }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetBadgesQuery,
  useAddProgressMutation,
  useUpdateProfileMutation,
  useUpdatePreferencesMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
} = usersApi;
