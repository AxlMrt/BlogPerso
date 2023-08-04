/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import { IBook } from '../../types';
import agent from '../../axios/agent';

export const fetchAllBooksAsync = createAsyncThunk<IBook[], void, { state: RootState }>(
  'books/fetchAllBooksAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Book.bookList();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
);

export const fetchBookAsync = createAsyncThunk<IBook, string>(
  'books/fetchBookAsync',
  async (_, thunkAPI) => {
    try {
      return agent.Book.getBook(_);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
);

export const addBookAsync = createAsyncThunk<IBook, any>(
  'books/addBookAsync',
  async (data, thunkAPI) => {
    try {
      return await agent.Book.addBook(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
);

export const updateBookAsync = createAsyncThunk<IBook, any>(
  'books/updateBookAsync',
  async (values, thunkAPI) => {
    try {
      return await agent.Book.updateBook(values);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
);

export const updateFeedBackAsync = createAsyncThunk<IBook, { id: string, feedBack: number }>(
  'books/updateBookAsync',
  async (data, thunkAPI) => {
    try {
      return agent.Book.updateFeedBack(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
);

export const deleteBookAsync = createAsyncThunk<IBook, string>(
  'books/deleteBookAsync',
  async (_, thunkAPI) => {
    try {
      return agent.Book.deleteBook(_);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
);