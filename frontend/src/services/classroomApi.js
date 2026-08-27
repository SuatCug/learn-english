import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

export const classroomApi = createApi({
  reducerPath: 'classroomApi',
  baseQuery,
  tagTypes: ['Classroom'],
  endpoints: (builder) => ({
    getMyClassrooms: builder.query({
      query: () => '/classrooms',
      providesTags: ['Classroom'],
    }),
    createClassroom: builder.mutation({
      query: (payload) => ({ url: '/classrooms', method: 'POST', body: payload }),
      invalidatesTags: ['Classroom'],
    }),
    joinClassroom: builder.mutation({
      query: (payload) => ({ url: '/classrooms/join', method: 'POST', body: payload }),
      invalidatesTags: ['Classroom'],
    }),
    getClassroom: builder.query({
      query: (id) => `/classrooms/${id}`,
      providesTags: (result, error, id) => [{ type: 'Classroom', id }],
    }),
    createAssignment: builder.mutation({
      query: ({ id, ...payload }) => ({ url: `/classrooms/${id}/assignments`, method: 'POST', body: payload }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Classroom', id }],
    }),
    deleteAssignment: builder.mutation({
      query: ({ id, assignmentId }) => ({ url: `/classrooms/${id}/assignments/${assignmentId}`, method: 'DELETE' }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Classroom', id }],
    }),
    getClassroomResults: builder.query({
      query: (id) => `/classrooms/${id}/results`,
    }),
  }),
});

export const {
  useGetMyClassroomsQuery,
  useCreateClassroomMutation,
  useJoinClassroomMutation,
  useGetClassroomQuery,
  useCreateAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetClassroomResultsQuery,
} = classroomApi;
