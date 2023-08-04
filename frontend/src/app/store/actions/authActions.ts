import { createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../../axios/agent';

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
      const data = await agent.Auth.auth(email, password);

      localStorage.setItem('userToken', data.tokenData.token);
      localStorage.setItem('user', data.user.email);

      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);