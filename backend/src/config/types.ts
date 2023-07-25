export interface IUser {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  isAdmin: boolean,
}

export interface ITokenData {
  token: string,
  expiresIn: number,
}

export interface IDataStoredInToken {
  _id: number,
}