/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types";
import baseQuery from "./baseQuery";

export const userApi = createApi({
  reducerPath: 'users',
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<IUser, void>({
      query: () => ({ url: '/users', method: 'get' })
    }),
    getUser: builder.query<IUser, string>({
      query: (id) => ({ url: `/users/${id}`, method: 'get' })
    }),
    addNewUser: builder.mutation<IUser, any>({
      query: (user) => ({
        url: '/users',
        method: 'post',
        body: user
      }),
    }),
    updateUser: builder.mutation<any, any>({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: 'put',
        body: data.formData
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({ url: `/users/${id}`, method: 'delete' })
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useAddNewUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userApi;