export interface IUser {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
}

export interface ITokenData {
  token: string,
  expiresIn: number,
}

export interface IDataStoredInToken {
  _id: number,
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