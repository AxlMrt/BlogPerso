import { RequestHandler, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma/lib/prisma";
import createToken from "../utils/tokens";
import createCookie from "../utils/cookies";
import WrongCredentials from "../config/exceptions/WrongCred";
import HttpException from "../config/exceptions/HttpException";
import { IUserLogin } from "../config/types";

const login: RequestHandler<{ email: string, password: string }> = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: IUserLogin = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email
      },
    });
    
    if (!user)
      return next(new WrongCredentials());
    
    const isPasswordMatching = bcrypt.compareSync(password, user.password);
    if (isPasswordMatching) {
      const tokenData = createToken(user);
      res.setHeader('Set-Cookie', [createCookie(tokenData)]);
      res.json({ user, tokenData });
    } else {
      next(new WrongCredentials());
    }
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const logout: RequestHandler = async (req: Request, res: Response) => {
  res.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
  res.status(200).json();
}

const _ = {
  login,
  logout
}

export default _;