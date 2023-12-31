import { createApi } from "@reduxjs/toolkit/query/react";
import { IBook, INote } from "../../types";
import baseQuery from "./baseQuery";

interface ListResponse<T> {
  page: number;
  total: number;
  total_pages: number;
  books: T[];
}

export const userQueryApi = createApi({
  reducerPath: "query",
  baseQuery,
  endpoints: (builder) => ({
    getUserBook: builder.query<
      ListResponse<IBook>,
      {
        id: string;
        page: number;
        search: string;
        field: string;
        order: string;
        type: string;
      }
    >({
      query: ({ id, page = 1, search, field, order, type }) => ({
        url: `/query/bookList/${id}?page=${page}&search=${search}&field=${field}&order=${order}&type=${type}`,
      }),
    }),
    getUserNotes: builder.query<
      any, { id: string }>({
      query: ({ id }) => ({
        url: `/query/noteList/${id}`
      }),
    })
  }),
});

export const { useGetUserBookQuery, useGetUserNotesQuery } = userQueryApi;
