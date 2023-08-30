/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { store } from "../store/configureStore";

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refresh");

    if (
      error.config.url != "/refresh" &&
      (error.response.status === 403 || error.response.status === 498) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      if (refreshToken && refreshToken != "") {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${refreshToken}`;
        console.log("refreshToken");
        await axios
          .post("/refresh")
          .then((response) => {
            localStorage.setItem("token", response.data.tokenData.token);
            localStorage.setItem(
              "refresh",
              response.data.refreshTokenData.token,
            );
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${response.data.accessToken}`;
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.accessToken}`;
            window.location.replace("/");
          })
          .catch((err) => {
            console.log(err.response.status);
            refreshToken = null;
          });
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Auth = {
  auth: (email: string, password: string) =>
    requests.post("login", { email, password }),
  logout: () => requests.post("logout", {}),
  getUserDetails: () => requests.get("login/profile"),
};

const agent = {
  Auth,
};

export default agent;
