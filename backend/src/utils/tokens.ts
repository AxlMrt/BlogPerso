import jwt from 'jsonwebtoken';
import { IDataStoredInToken, ITokenData, IUser } from '@/config/types';
import secrets from '@/config/secrets';

const createToken = (user: IUser): ITokenData => {
  const expiresIn = 60 * 60;
  const dataStoredInToken: IDataStoredInToken = {
    _id: user.id,
  };
  const token = jwt.sign(dataStoredInToken, secrets.jwtSecret, { expiresIn });

  return {
    expiresIn,
    token,
  };
};

const createRefreshToken = (user: IUser): ITokenData => {
  const expiresIn = 6000 * 6000;
  const dataStoredInToken: IDataStoredInToken = {
    _id: user.id,
  };

  const token = jwt.sign(dataStoredInToken, secrets.jwtRefresh, { expiresIn });

  return {
    expiresIn,
    token,
  };
};

const tokensFn = { createToken, createRefreshToken };

export default tokensFn;
