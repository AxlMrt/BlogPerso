export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  photo: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  books: IBook[];
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IRegister extends IUser {
	confirmPassword: string
}

export interface IBook {
  id: string;
  title: string;
  author: string;
  type: string;
  year: number;
  publisher: string;
  feedBack: number;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: IUser;
}

export interface IGenericResponse {
  status: string;
  message: string;
}