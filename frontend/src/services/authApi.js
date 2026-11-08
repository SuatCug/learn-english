import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }),
    }),
    register: builder.mutation({
      query: (payload) => ({ url: '/auth/register', method: 'POST', body: payload }),
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({ url: '/auth/verify-email', method: 'POST', body: { token } }),
    }),
    // Mailde gelen 6 haneli kodla doğrulama.
    verifyEmailCode: builder.mutation({
      query: ({ email, code }) => ({ url: '/auth/verify-email', method: 'POST', body: { email, code } }),
    }),
    // Google ile giriş: Google'dan gelen ID token (credential) backend'e gönderilir.
    googleLogin: builder.mutation({
      query: ({ credential }) => ({ url: '/auth/google', method: 'POST', body: { credential } }),
    }),
    // Şifremi unuttum: kod gönder → kodu doğrula (resetToken döner) → yeni şifreyi kaydet.
    forgotPassword: builder.mutation({
      query: (email) => ({ url: '/auth/forgot-password', method: 'POST', body: { email } }),
    }),
    verifyResetCode: builder.mutation({
      query: ({ email, code }) => ({ url: '/auth/verify-reset-code', method: 'POST', body: { email, code } }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, resetToken, password }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { email, resetToken, password },
      }),
    }),
    resendVerification: builder.mutation({
      query: (email) => ({ url: '/auth/resend-verification', method: 'POST', body: { email } }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useVerifyEmailCodeMutation,
  useGoogleLoginMutation,
  useResendVerificationMutation,
  useForgotPasswordMutation,
  useVerifyResetCodeMutation,
  useResetPasswordMutation,
} = authApi;
