
export interface IUser {
  id: string
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  photo?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  books?: IBook[];
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IBook {
  id: string;
  title: string;
  author: string;
  type: string;
  year: number;
  publisher: string;
  feedBack: number;
  isRead: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: IUser;
}

export interface ITokenData {
  token: string;
  expiresIn: number;
}

export interface IDataStoredInToken {
  _id: string;
}

export type UploadedFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}