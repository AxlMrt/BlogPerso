/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { addUserAsync } from '../actions/userActions';

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // register user
    builder.addCase(addUserAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addUserAsync.fulfilled, (state) => {
      state.loading = false;
      state.success = true; // registration successful
    });
    builder.addCase(addUserAsync.rejected, (state, { payload }) => {
      state.loading = false;
      (state.error as any) = payload;
    });
  },
});

export default userSlice;