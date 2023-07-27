import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import secrets from "../config/secrets";
import prisma from "../../prisma/lib/prisma";
import { IDataStoredInToken  } from "../config/types";
import WrongAuthenticationTokenException from "../config/exceptions/WrongAuthToken";
import MissingAuthenticationTokenException from "../config/exceptions/MissingAuthToken";

const authMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction ) => {
  const cookies = req.cookies;

  if (cookies && cookies.Authorization)
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secrets.jwtSecret) as IDataStoredInToken;
      const id = verificationResponse._id;

      const user = await prisma.user.findUnique({
        where: { id }
      });

      if (user) {
        req.body.user = user;
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