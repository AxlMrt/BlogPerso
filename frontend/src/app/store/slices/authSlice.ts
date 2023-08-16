/* eslint-disable @typescript-eslint/no-unused-vars */
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
  error: false,
  errorDetails: null,
  success: 'idle',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      window.location.replace('/login')
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.success = 'idle';
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.error = false;
      state.loading = false;
      state.success = 'true';
      state.user = payload.others;
      state.token = payload.token;
    });
    builder.addCase(userLogin.rejected, (state, _action) => {
      state.loading = false;
      state.success = 'false';
      state.error = true;
    });
    // logout user
    builder.addCase(userLogout.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(userLogout.fulfilled, (state, { payload }) => {
      state.error = false;
      state.loading = false;
      state.user = payload;
      state.token = payload.token;
    });
    builder.addCase(userLogout.rejected, (state, _action) => {
      state.loading = false;
      state.error = true;
    });
    //user details
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      state.error = false;
      state.loading = false;
      state.user = payload;
      state.token = token;
    });
    builder.addCase(getUserDetails.rejected, (state, _action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice;