/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { store } from '../store/configureStore';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
}

const Auth = {
  auth: (email: string, password: string) => requests.post('login', { email, password }),
  logout: () => requests.post('logout', {})
}

const agent = {
  Auth,
}

export default agent;