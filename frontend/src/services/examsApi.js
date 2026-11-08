import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

export const examsApi = createApi({
  reducerPath: 'examsApi',
  baseQuery,
  endpoints: (builder) => ({
    getExams: builder.query({
      query: () => '/exams',
    }),
    getExam: builder.query({
      query: (level) => `/exams/${level}`,
    }),
    submitExam: builder.mutation({
      query: ({ level, answers }) => ({ url: `/exams/${level}/submit`, method: 'POST', body: { answers } }),
    }),
  }),
});

export const { useGetExamsQuery, useGetExamQuery, useSubmitExamMutation } = examsApi;
