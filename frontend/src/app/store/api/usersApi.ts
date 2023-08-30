/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { IRegister, IUser } from "../../types";
import baseQuery from "./baseQuery";

export const userApi = createApi({
  reducerPath: "users",
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<IUser, void>({
      query: () => ({ url: "/users", method: "GET" }),
    }),
    getUser: builder.query<IUser, string>({
      query: (id) => ({ url: `/users/${id}`, method: "GET" }),
    }),
    addNewUser: builder.mutation<IRegister, IRegister>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    updateUser: builder.mutation<IUser, any>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({ url: `/users/${id}`, method: "delete" }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
