import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

export const topicsApi = createApi({
  reducerPath: 'topicsApi',
  baseQuery,
  // Konu listeleri sık değişmese de arka planda (ör. yeni konu eklendiğinde) güncellenebilir;
  // sayfa her açıldığında önbellekteki veriyi anında gösterip arkadan tazesini çeker, böylece
  // kullanıcı SPA içinde gezinirken eski/statik listeler görmez.
  refetchOnMountOrArgChange: 30,
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: ({ category, level, search } = {}) => ({ url: '/topics', params: { category, level, search } }),
    }),
    getTopic: builder.query({
      query: (id) => `/topics/${id}`,
    }),
    getTopicQuestions: builder.query({
      query: (id) => `/topics/${id}/questions`,
    }),
    checkAnswers: builder.mutation({
      query: ({ id, answers }) => ({ url: `/topics/${id}/check`, method: 'POST', body: { answers } }),
    }),
  }),
});

export const { useGetTopicsQuery, useGetTopicQuery, useGetTopicQuestionsQuery, useCheckAnswersMutation } = topicsApi;
