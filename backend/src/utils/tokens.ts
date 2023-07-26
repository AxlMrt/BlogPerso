import jwt from "jsonwebtoken";
import { IDataStoredInToken, IUser, ITokenData } from "../config/types";
import secrets from "../config/secrets";

const createToken = (user: IUser): ITokenData => {
  const expiresIn = 60 * 60;
  const dataStoredInToken: IDataStoredInToken = {
    _id: user.email
  };
  const token = jwt.sign(dataStoredInToken, secrets.jwtSecret, { expiresIn });

  return {
    expiresIn,
    token
  };
}

export default createToken;