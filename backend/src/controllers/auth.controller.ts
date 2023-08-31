/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import prisma from '@/prisma/lib/prisma';
import { ITokenData, IUser, IUserLogin } from '@/config/types';
import HttpException from '@/config/exceptions/HttpException';
import WrongCredentials from '@/config/exceptions/WrongCred';
import tokensFn from '@/utils/tokens';
import createCookie from '@/utils/cookies';
import { validEmail } from '@/utils/validation';
import { resetUserPassword, sendPasswordResetOTP } from '@/utils/resetPassword';

const login: RequestHandler<{ email: string; password: string }> = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!Object.keys(req.body).length) next(new HttpException(400, 'Credentials are needed.'));

    if (!req.body.email) next(new HttpException(400, 'Email is needed.'));

    if (!req.body.password) next(new HttpException(400, 'Password is needed.'));

    if (!validEmail(req.body.email)) next(new HttpException(400, 'Email is in the wrong format.'));

    const { email, password }: IUserLogin = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: { books: true },
    });

    if (!user) return next(new HttpException(404, "User doesn't exist"));

    const isPasswordMatching = bcrypt.compareSync(password, user.password);
    if (isPasswordMatching) {
      const tokenData: ITokenData = tokensFn.createToken(user);
      const refreshTokenData: ITokenData = tokensFn.createRefreshToken(user);
      const { password, role, createdAt, updatedAt, ...others } = user;

      res.cookie('token', [createCookie(tokenData)]);
      res.cookie('refresh', [createCookie(refreshTokenData)]);
      res.json({ others, tokenData, refreshTokenData });
    } else {
      next(new WrongCredentials());
    }
  } catch (error) {
    next(new HttpException(500, 'Failed to login.'));
  }
};

const logout: RequestHandler = async (req: Request, res: Response) => {
  res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
  res.json();
};

const getUserProfile: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.body.user;

  try {
    const user = await prisma.user.findUnique({
      where: { id: _id },
      include: { books: true },
    });

    if (!user) next(new HttpException(404, 'User not found.'));

    const { password, role, createdAt, updatedAt, ...others } = user as IUser;
    res.json(others);
  } catch (error) {
    next(new HttpException(500, 'Failed to get user profile.'));
  }
};

const passwordRequestReset = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  try {
    if (!email) next(new HttpException(400, 'An email is required.'));

    const createdPasswordResetOTP = await sendPasswordResetOTP(email);

    res.json(createdPasswordResetOTP);
  } catch (error) {
    next(new HttpException(500, 'Failed to send a reset request: ' + (error as Error).message));
  }
};

const resetPassword: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!(email && otp && newPassword)) next(new HttpException(400, 'Empty crendentials are not allowed.'));

    await resetUserPassword({ email, otp, newPassword });
    res.json({ email, passwordreset: true });
  } catch (error) {
    next(new HttpException(500, 'Failed to reset password: ' + (error as Error).message));
  }
};

const _ = {
  login,
  logout,
  getUserProfile,
  passwordRequestReset,
  resetPassword,
};

export default _;
