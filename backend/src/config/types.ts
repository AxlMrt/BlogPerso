export interface IUser {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  isAdmin: boolean
}

export interface TokenData {
  token: string,
  expiresIn: number,
}

export interface DataStoredInToken {
  _id: number,
}