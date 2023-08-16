import { Request, Response } from "express";
import secrets from "../config/secrets";
import tokensFn from "../utils/tokens"
import jwt from "jsonwebtoken";
import { IDataStoredInToken } from '../config/types';

const refreshedToken = (req: Request, res: Response) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.split(' ')[1];
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, secrets.jwtRefresh, async (err: any, user: any) => {
      if (err) return res.sendStatus(401);
      const { _id } = user as IDataStoredInToken;
  
      const isUser = await prisma?.user.findUnique({
        where: { id: _id }
      })
  
      if (isUser) {
        delete user.iat;
        delete user.exp;
        const refreshedToken = tokensFn.createToken(user);
        res.send({
          accessToken: refreshedToken,
        });
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