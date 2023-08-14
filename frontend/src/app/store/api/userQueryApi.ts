import { createApi } from "@reduxjs/toolkit/query/react";
import { IBook } from "../../types";
import baseQuery from "./baseQuery";

interface ListResponse<T> {
  page: number
  total: number
  total_pages: number
  books: T[]
}

export const userQueryApi = createApi({
  reducerPath: 'query',
  baseQuery,
  endpoints: (builder) => ({
    getUserBook: builder.query<ListResponse<IBook>, { id: string, page: number }>({
      query: ({ id, page = 1 }) => ({ url: `/query/bookList/${id}?page=${page}` })
    }),
    getBookFilters: builder.query<string, string>({
      query: (id) => ({ url: `/query/filters/${id}`, method: 'get' })
    }),
  }),
});

export const { useGetUserBookQuery, useGetBookFiltersQuery } = userQueryApi;