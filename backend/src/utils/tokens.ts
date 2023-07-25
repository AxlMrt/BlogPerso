import jwt from "jsonwebtoken";
import { DataStoredInToken, IUser, TokenData } from "../config/types";
import secrets from "../config/secrets";

const createToken = (user: IUser): TokenData => {
  const expiresIn = 60 * 60;
  const dataStoredInToken: DataStoredInToken = {
    _id: user.id
  };
  const token = jwt.sign(dataStoredInToken, secrets.jwtSecret, { expiresIn });

  return {
    expiresIn,
    token
  };
}

export default createToken;