import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BASE_URL,
  prepareHeaders: (headers) => {
    //take from localstore because there is a bug with the getState()
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('Cookies', token);
    }
    return headers;
  }
});

export default baseQuery;