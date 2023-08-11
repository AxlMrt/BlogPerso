import { createApi } from "@reduxjs/toolkit/query/react";
import { IBook } from "../../types";
import baseQuery from "./baseQuery";

export const userQueryApi = createApi({
  reducerPath: 'query',
  baseQuery,
  endpoints: (builder) => ({
    getUserBook: builder.query<IBook, string>({
      query: (id) => ({ url: `/query/bookList/${id}`, method: 'get' })
    }),
    getBookFilters: builder.query<string, void>({
      query: () => ({ url: '/query/filters', method: 'get' })
    }),
  }),
});

export const { useGetUserBookQuery, useGetBookFiltersQuery } = userQueryApi;