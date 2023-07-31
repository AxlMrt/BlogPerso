import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const backendURL = 'http://0.0.0.0:8000';

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ email, firstName, lastName, password }: { email: string, firstName: string, lastName: string, password: string }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.post(
        `${backendURL}/api/v1/users`,
        { email, firstName, lastName, password },
        config
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);