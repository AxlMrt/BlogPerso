/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { store } from '../store/configureStore';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  const token = store.getState().auth.userToken;
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

const User = {
  userList: () => requests.get('users'),
  getUser: (id: string) => requests.get(`users/${id}`),
  addUser: (data: any) => requests.post('users', data),
  updateUser: (data: any) => requests.put(`users/${data.id}`, data),
  deleteUser: (id: string) => requests.delete(`users/${id}`),
}

const Auth = {
  auth: (email: string, password: string) => requests.post('login', { email, password }),
  logout: () => requests.post('logout', {})
}

const Book = {
  bookList: () => requests.get('books/feed'),
  getBook: (id: string) => requests.get(`books/${id}`),
  addBook: (data: any) => requests.post('books', data),
  updateBook: (data: any) => requests.put(`books/${data.id}`, data),
  updateFeedBack: (data: any) => requests.put(`books/${data.id}`, data),
  deleteBook: (id: string) => requests.delete(`books/${id}`),
}

const agent = {
  User,
  Auth,
  Book
}

export default agent;