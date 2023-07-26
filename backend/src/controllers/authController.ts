import { RequestHandler, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma/lib/prisma";
import createToken from "../utils/tokens";
import createCookie from "../utils/cookies";
import WrongCrendentials from "../config/exceptions/WrongCred";
import HttpException from "../config/exceptions/HttpException";

const login: RequestHandler<{ email: string, password: string }> = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email
      },
    });
    
    if (!user)
      return next(new WrongCrendentials());
    
    const isPasswordMatching = bcrypt.compareSync(password, user.password);
    if (isPasswordMatching) {
      const tokenData = createToken(user);
      res.setHeader('Set-Cookie', [createCookie(tokenData)]);
      res.json(user);
    } else {
      next(new WrongCrendentials());
    }
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const logout = async(req: Request, res: Response) => {
  res.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
  res.status(200).json();
}

const _ = {
  login,
  logout
}

export default _;