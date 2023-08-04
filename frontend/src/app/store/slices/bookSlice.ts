/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { addBookAsync, deleteBookAsync, fetchAllBooksAsync, fetchBookAsync, updateBookAsync } from '../actions/bookActions';
import { IBook } from "../../types";
import { RootState } from "../configureStore";

const booksAdapter = createEntityAdapter<IBook>();

interface BookState {
  loading: boolean,
  error: null,
  success: boolean,
}


const bookSlice = createSlice({
  name: 'book',
  initialState: booksAdapter.getInitialState<BookState>({
    loading: false,
    error: null,
    success: false,
  }),
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBooksAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllBooksAsync.fulfilled, (state, action) => {
      booksAdapter.setAll(state, action.payload);
      state.loading = false;
      state.success = true;
    });
    builder.addCase(fetchAllBooksAsync.rejected, (state, { payload }) => {
      state.loading = false;
      (state.error as any) = payload;
    });

    builder.addCase(fetchBookAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBookAsync.fulfilled, (state, action) => {
      booksAdapter.upsertOne(state, action.payload);
      state.loading = false;
      state.success = true;
    });
    builder.addCase(fetchBookAsync.rejected, (state, { payload }) => {
      state.loading = false;
      (state.error as any) = payload;
    });

    builder.addCase(addBookAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addBookAsync.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(addBookAsync.rejected, (state, { payload }) => {
      state.loading = false;
      (state.error as any) = payload;
    });

    builder.addCase(updateBookAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateBookAsync.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(updateBookAsync.rejected, (state, { payload }) => {
      state.loading = false;
      (state.error as any) = payload;
    });
    
    builder.addCase(deleteBookAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBookAsync.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(deleteBookAsync.rejected, (state, { payload }) => {
      state.loading = false;
      (state.error as any) = payload;
    });
  },
});

export const booksSelectors = booksAdapter.getSelectors((state: RootState) => state.book);
export default bookSlice;