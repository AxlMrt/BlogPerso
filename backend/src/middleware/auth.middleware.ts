import { Response, NextFunction } from "express";
import secrets from "../config/secrets";
import * as jwt from "jsonwebtoken";
import prisma from "../prisma/lib/prisma";
import { IDataStoredInToken, IRequestWithUser } from "../config/types";
import WrongAuthenticationTokenException from "../config/exceptions/WrongAuthToken";
import MissingAuthenticationTokenException from "../config/exceptions/MissingAuthToken";

const authMiddleware = async (req: IRequestWithUser, res: Response, next: NextFunction ) => {
  const cookies = req.cookies;

  if (cookies && cookies.Authorization)
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secrets.jwtSecret) as IDataStoredInToken;
      const id = verificationResponse._id;
      console.log(id)
      const user = await prisma.user.findUnique({
        where: {
          id,
        }
      });

      if (user) {
        req.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  else
    next(new MissingAuthenticationTokenException());
}

export default authMiddleware;