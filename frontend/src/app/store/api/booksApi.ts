/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { IBook } from "../../types";
import baseQuery from "./baseQuery";

export const bookApi = createApi({
  reducerPath: "books",
  baseQuery,
  endpoints: (builder) => ({
    getBooks: builder.query<IBook, void>({
      query: () => ({ url: "/books/feed", method: "get" }),
    }),
    getBook: builder.query<IBook, string>({
      query: (id) => ({ url: `/books/${id}`, method: "get" }),
    }),
    addNewBook: builder.mutation<IBook, IBook>({
      query: (book) => ({
        url: "/books",
        method: "post",
        body: book,
      }),
    }),
    updateBook: builder.mutation<IBook, IBook>({
      query: (book) => ({
        url: `/books/${book.id}`,
        method: "put",
        body: book,
      }),
    }),
    deleteBook: builder.mutation<void, { bookId: string; id: string }>({
      query: ({ bookId, id }) => ({
        url: `/books/${bookId}`,
        method: "delete",
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddNewBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
