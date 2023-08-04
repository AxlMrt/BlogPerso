/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { userLogin, userLogout } from '../actions/authActions';
import { IUser } from '../../types';
import { fetchUserAsync } from '../actions/userActions';
import { RootState } from '../configureStore';

// initialize userToken from local storage
const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

const user = localStorage.getItem('user')
  ? localStorage.getItem('user')
  : null;

const usersAdapter = createEntityAdapter<IUser>();
interface UserState {
  loading: boolean,
  user: any,
  token: string | null,
  error: null,
  success: boolean,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: usersAdapter.getInitialState<UserState>({
  loading: false,
  user,
  token,
  error: null,
  success: false,
}),
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.loading = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.loading = false;
      state.user = payload.user;
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
    //current user
    builder.addCase(fetchUserAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
      usersAdapter.upsertOne(state, action.payload);
      state.loading = false;
      state.success = true;
    });
    builder.addCase(fetchUserAsync.rejected, (state, { payload }) => {
      state.loading = false;
      (state.error as any) = payload;
    });

  },
});

export const usersSelectors = usersAdapter.getSelectors((state: RootState) => state.auth);
export const { logout, setUser } = authSlice.actions;

export default authSlice;