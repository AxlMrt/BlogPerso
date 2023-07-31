import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    darkMode: localStorage.getItem("theme") || false
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.darkMode = action.payload;
    },
  },
})

export const { toggleTheme } = themeSlice.actions;
export default themeSlice;