import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

export const placementApi = createApi({
  reducerPath: 'placementApi',
  baseQuery,
  endpoints: (builder) => ({
    getPlacementTest: builder.query({
      query: () => '/placement-test',
    }),
    submitPlacementTest: builder.mutation({
      query: (answers) => ({ url: '/placement-test/submit', method: 'POST', body: { answers } }),
    }),
  }),
});

export const { useGetPlacementTestQuery, useSubmitPlacementTestMutation } = placementApi;
