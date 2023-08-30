import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Cookies", token);
    }
    return headers;
  },
});

export default baseQuery;
