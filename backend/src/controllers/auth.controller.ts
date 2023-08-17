import { RequestHandler, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma/lib/prisma";
import createCookie from "../utils/cookies";
import WrongCredentials from "../config/exceptions/WrongCred";
import HttpException from "../config/exceptions/HttpException";
import { IUser, IUserLogin } from "../config/types";
import tokensFn from "../utils/tokens";

const login: RequestHandler<{ email: string, password: string }> = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: IUserLogin = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email
      },
      include: { books: true }
    });

    if (!user)
      return next(new WrongCredentials());

    const isPasswordMatching = bcrypt.compareSync(password, user.password);
    if (isPasswordMatching) {
      const tokenData = tokensFn.createToken(user);
      const refreshTokenData = tokensFn.createRefreshToken(user);
      const { password, role, createdAt, updatedAt, ...others } = user;

      res.cookie('token', [createCookie(tokenData)]);
      res.cookie('refresh', [createCookie(refreshTokenData)]);
      res.json({ others, tokenData, refreshTokenData });
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

const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.body.user;

  try {
    const user = await prisma.user.findUnique({
      where: { id: _id },
      include: { books: true }
    })
  
    const { password, role, createdAt, updatedAt, ...others } = user as IUser;
    res.json(others)
  } catch (error) {
     next(new HttpException(500, "Something went wrong"));
  }
}

const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user)
      next(new HttpException(404, 'User not found'));
  
    const { password, role, createdAt, updatedAt, ...others } = user as IUser;
    res.json(others)
  } catch (error) {
     next(new HttpException(500, "Something went wrong"));
  }
}

const resetPassword = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

     if (!user)
       throw new HttpException(404, 'User not found');
    
    const otpDetails = {
      email,
      subject: "Password reset",
      message: "Enter the code below to reset your password.",
      duration: 2,
    }
  } catch (error) {
    
  }
}

const _ = {
  login,
  logout,
  getUserProfile,
  forgetPassword,
  resetPassword
}

export default _;