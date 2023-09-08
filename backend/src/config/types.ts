export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  photo?: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  books?: IBook[];
  notes?: INote[];
}

export interface INote {
  id: string;
  title: string;
  note?: string;
  createdAt: Date;
  userId: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IBook {
  id: string;
  title: string;
  author: string | null;
  type: string | null;
  year: number | null;
  publisher: string | null;
  feedBack: number;
  isRead: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
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
};

export interface IOtp {
  email: string;
  otp: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface IOtpDetails {
  email: string;
  subject: string;
  message: string;
  duration: number;
}
