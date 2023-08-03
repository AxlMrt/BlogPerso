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

export const addBookAsync = createAsyncThunk<IBook, { title: string, author: string, type: string, year: number, publisher: string, userMail: string }>(
  'books/addBookAsync',
  async ({ title, author, type, year, publisher, userMail }, thunkAPI) => {
    try {
      return await agent.Book.addBook(title, author, type, year, publisher, userMail);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
);

export const updateBookAsync = createAsyncThunk<IBook, { title: string, author: string, type: string, year: number, publisher: string }>(
  'books/addBookAsync',
  async ({ title, author, type, year, publisher }, thunkAPI) => {
    try {
      return await agent.Book.updateBook(title, author, type, year, publisher);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
);

export const deleteBookAsync = createAsyncThunk<IBook, string>(
  'books/fetchBookAsync',
  async (_, thunkAPI) => {
    try {
      return agent.Book.deleteBook(_);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
);