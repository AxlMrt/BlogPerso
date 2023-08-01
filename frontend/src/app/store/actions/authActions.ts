import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../../axios/agent';

const backendURL = 'http://0.0.0.0:8000';

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON

      const data = await agent.Auth.auth(email, password);
      console.log(data.user)
      // store user's token in local storage
      localStorage.setItem('userToken', data.tokenData.token);
      localStorage.setItem('user', data.user.email);

      return data;
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

export const userLogout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/api/v1/logout`,
        config
      )
  
      return data;
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