import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.withCredentials = true;


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
  addUser: (email: string, firstName: string, lastName: string, password: string) => requests.post('users', { email, firstName, lastName, password }),
  updateUser: (email: string, firstName: string, lastName: string, photo: string, password: string) => requests.post('users', { email, firstName, lastName, photo,  password}),
  deleteUser: (id: string) => requests.get(`users/${id}`),
}

const Auth = {
  auth: (email: string, password: string) => requests.post('login', { email, password })
}

const Book = {
  bookList: () => requests.get('books/feed'),
  getBook: (id: string) => requests.get(`books/${id}`),
  addBook: (title: string, author: string, type: string, year: number, publisher: string, userMail: string) => requests.post('books', { title, author, type, year, publisher, userMail }),
  updateBook: (title: string, author: string, type: string, year: number, publisher: string) => requests.post('books', { title, author, type, year, publisher }),
  deleteBook: (id: string) => requests.get(`books/${id}`),
}

const agent = {
  User,
  Auth,
  Book
}

export default agent;