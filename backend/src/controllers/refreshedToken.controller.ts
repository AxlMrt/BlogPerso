import { Request, Response } from "express";
import secrets from "../config/secrets";
import tokensFn from "../utils/tokens"
import jwt from "jsonwebtoken";
import { IDataStoredInToken } from '../config/types';
import createCookie from "../utils/cookies";

const refreshedToken = (req: Request, res: Response) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization

  
    jwt.verify(token, secrets.jwtRefresh, async (err: any, user: any) => {
      if (err) return res.sendStatus(401);

      const { _id } = user as IDataStoredInToken;
  
      const isUser = await prisma?.user.findUnique({
        where: { id: _id }
      })
      

      if (isUser) {
        delete user.iat;
        delete user.exp;
    
        const tokenData = tokensFn.createToken(isUser);
        const refreshTokenData = tokensFn.createRefreshToken(isUser);
        const { password, role, createdAt, updatedAt, ...others } = user;

        res.cookie('token', [createCookie(tokenData)]);
        res.cookie('refresh', [createCookie(refreshTokenData)]);
        res.json({ tokenData, refreshTokenData });
        
      } else {
        res.sendStatus(404)
      }
    });
  }
}

const _ = {
  refreshedToken
}

export default _;