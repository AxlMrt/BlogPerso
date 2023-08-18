import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { themeSlice } from './slices/themeSlice';
import authSlice from './slices/authSlice';
import { bookApi } from './api/booksApi';
import { userApi } from './api/usersApi';
import { userQueryApi } from './api/userQueryApi';
import { authApi } from './api/authApi';

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [userQueryApi.reducerPath]: userQueryApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware, bookApi.middleware, userApi.middleware, userQueryApi.middleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;