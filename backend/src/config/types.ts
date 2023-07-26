import { Request } from "express";

export interface IUser {
  id: string
  email: string,
  firstName: string,
  lastName: string,
  password: string,
}

export interface IRequestWithUser extends Request {
  user: IUser
}

export interface ITokenData {
  token: string,
  expiresIn: number,
}

export interface IDataStoredInToken {
  _id: string,
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