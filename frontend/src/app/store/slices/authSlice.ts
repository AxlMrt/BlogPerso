/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { getUserDetails, userLogin, userLogout } from '../actions/authActions';
import { userApi } from '../api/usersApi';

const token = localStorage.getItem('token')
? localStorage.getItem('token')
  : sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null;

  const refreshToken = localStorage.getItem('refresh')
? localStorage.getItem('token')
: null;

const initialState = {
  token,
  refreshToken,
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
      sessionStorage.clear();
      state.loading = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.error = false;
      state.success = 'idle';
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
      state.refreshToken = payload.refresh;
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
      state.refreshToken = payload.refresh;
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
    builder.addMatcher(userApi.endpoints.addNewUser.matchFulfilled, (state, action) => {
      state.user = action.payload.others;
      state.token = action.payload.tokenData.token;
      state.refreshToken = action.payload.refreshTokenData.token;
      sessionStorage.setItem('token', action.payload.tokenData.token);
      window.location.replace('/')
    })
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice;