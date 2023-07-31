/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from '../actions/authActions'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
      builder.addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.userToken;
      });
      builder.addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        (state.error as any) = payload;
      });
      // register user
      builder.addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true; // registration successful
      });
      builder.addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        (state.error as any) = payload;
      });
  },
})

export const { logout, setCredentials } = authSlice.actions;

export default authSlice;