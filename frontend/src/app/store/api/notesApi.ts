/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from "@reduxjs/toolkit/query/react";
import { INote } from "../../types";
import baseQuery from "./baseQuery";

export const notesApi = createApi({
  reducerPath: "notes",
  baseQuery,
  endpoints: (builder) => ({
    getNotes: builder.query<INote, void>({
      query: () => ({ url: "/notes", method: "get" }),
    }),
    getNote: builder.query<INote, string>({
      query: (id) => ({ url: `/notes/${id}`, method: "get" }),
    }),
    addNewNote: builder.mutation<INote, { title: string, note: string, userMail: string }>({
      query: (note) => ({
        url: "/notes",
        method: "post",
        body: note,
      }),
    }),
    updateNote: builder.mutation<INote, INote>({
      query: (note) => ({
        url: `/notes/${note.id}`,
        method: "put",
        body: note,
      }),
    }),
    deleteNote: builder.mutation<void, { noteId: string; id: string }>({
      query: ({ noteId, id }) => ({
        url: `/books/${noteId}`,
        method: "delete",
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
