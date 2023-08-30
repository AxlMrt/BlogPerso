import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: `/login/profile`,
        method: "GET",
      }),
    }),
    requestNewPassword: builder.mutation({
      query: (data) => ({
        url: "/login/reset-password-request",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/login/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserDetailsQuery,
  useRequestNewPasswordMutation,
  useResetPasswordMutation,
} = authApi;
