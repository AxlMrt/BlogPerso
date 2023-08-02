/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { addUserAsync } from '../actions/userActions';

const initialState = {
  loading: false,
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