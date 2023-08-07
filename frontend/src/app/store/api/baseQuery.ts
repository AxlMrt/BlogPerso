import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { store } from "../configureStore";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BASE_URL,
  prepareHeaders: (headers) => {
    const token = store.getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('Cookies', token);
    }
    return headers;
  }
});

export default baseQuery;