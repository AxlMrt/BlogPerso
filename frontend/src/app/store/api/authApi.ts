import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from './baseQuery'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: `/login/profile`,
        method: 'GET',
      }),
    }),
  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDetailsQuery } = authApi;