/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../../axios/agent';
import { setUser } from '../slices/authSlice';

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string, password: string }, { rejectWithValue, dispatch }) => {
    try {
      const data = await agent.Auth.auth(email, password);
      localStorage.setItem('token', data.tokenData.token);
      localStorage.setItem('refresh', data.refreshTokenData.token);
      dispatch(setUser(data.others));

      return data;
    } catch (error: any) {

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      return agent.Auth.logout();
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);


export const getUserDetails = createAsyncThunk(
  'auth/getUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      return agent.Auth.getUserDetails();
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
