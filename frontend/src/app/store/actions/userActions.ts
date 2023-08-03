/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import { IUser } from '../../types';
import agent from '../../axios/agent';

export const fetchAllUsersAsync = createAsyncThunk<IUser[], void, { state: RootState }>(
  'user/fetchAllUsersAsync',
  async (_, thunkAPI) => {
    try {
      return agent.User.userList();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
);

export const fetchUserAsync = createAsyncThunk<IUser, string>(
  'user/fetchUserAsync',
  async (_, thunkAPI) => {
    try {
      return agent.User.getUser(_);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
);

export const addUserAsync = createAsyncThunk<IUser, { email: string, firstName: string, lastName: string, password: string }>(
  'user/addUserAsync',
  async ({ email, firstName, lastName, password }, thunkAPI) => {
    try {
      return await agent.User.addUser(email, firstName, lastName, password);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
);

export const updateUserAsync = createAsyncThunk<IUser, { email: string, firstName: string, lastName: string, photo: string, password: string }>(
  'user/addUserAsync',
  async ({ email, firstName, lastName, photo, password }, thunkAPI) => {
    try {
      return await agent.User.updateUser(email, firstName, lastName, photo, password);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
);

export const deleteUserAsync = createAsyncThunk<IUser, string>(
  'user/fetchUserAsync',
  async (_, thunkAPI) => {
    try {
      return agent.User.deleteUser(_);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  }
);