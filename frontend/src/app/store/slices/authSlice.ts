/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { getUserDetails, userLogin, userLogout } from '../actions/authActions';

const token = localStorage.getItem('token')
? localStorage.getItem('token')
: null;

const initialState = {
  token,
  user: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
reducers: {
    logout: (state) => {
    localStorage.removeItem('token');
    window.location.replace('/')
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.others;
      state.token = payload.token;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      (state.error as any) = payload;
    });
    // logout user
    builder.addCase(userLogout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogout.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.token = payload.token;
    });
    builder.addCase(userLogout.rejected, (state, { payload }) => {
      state.loading = false;
      (state.error as any) = payload;
    });
    //user details
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.token = token;
    });
    builder.addCase(getUserDetails.rejected, (state, { payload }) => {
      state.loading = false;
      (state.error as any) = payload;
    });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice;