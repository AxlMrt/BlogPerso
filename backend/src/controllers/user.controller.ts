/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import prisma from '@/prisma/lib/prisma';
import tokensFn from '@/utils/tokens';
import createCookie from '@/utils/cookies';
import { hashData } from '@/utils/hashData';
import { transformValuesToLowercase, validEmail, validPassword } from '@/utils/validation';
import HttpException from '@/config/exceptions/HttpException';
import { IUser } from '@/config/types';

const getAllUsers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users: IUser[] = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(new HttpException(500, "Couldn't get all users."));
  }
};

const getUser: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!user) next(new HttpException(404, 'User not found.'));
    else res.status(200).json(user);
  } catch (error) {
    next(new HttpException(500, "Couldn't get user."));
  }
};

const createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allowedFields = ['email', 'firstName', 'lastName', 'password'];
    const receivedFields = Object.keys(req.body);
    const invalidFields = receivedFields.filter((field) => !allowedFields.includes(field));

    if (invalidFields.length > 0) next(new HttpException(400, 'Additional fields not allowed.'));
    if (!validEmail(req.body.email)) next(new HttpException(400, 'Invalid email.'));
    if (!validPassword(req.body.password)) next(new HttpException(400, 'Invalid password.'));

    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        req.body[key] = transformValuesToLowercase(req.body[key], key);
      }
    }

    const user: IUser | null = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (user) next(new HttpException(409, 'User already exist.'));

    const cryptedPassword = await hashData(req.body.password);
    const newUser: IUser = await prisma.user.create({
      data: {
        ...req.body,
        password: cryptedPassword,
      },
    });

    const tokenData = tokensFn.createToken(newUser);
    const refreshTokenData = tokensFn.createRefreshToken(newUser);
    const { password, role, createdAt, updatedAt, ...others } = newUser;

    res.setHeader('Set-Cookie', [createCookie(tokenData)]);
    res.status(201).json({ others, tokenData, refreshTokenData });
  } catch (error) {
    next(new HttpException(500, "Couldn't create a new user."));
  }
};

const updateUser: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = JSON.parse(JSON.stringify(req.body));
    //In case of picture
    if (req.body.user) {
      req.body = JSON.parse(req.body.user);
      for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
          if (req.body[key] === '') {
            delete req.body[key];
          }
        }
      }
    }

    const allowedFields = ['id', 'email', 'firstName', 'lastName', 'password', 'photo'];
    const receivedFields = Object.keys(req.body);
    const invalidFields = receivedFields.filter((field) => !allowedFields.includes(field));
    const uploadDir = __dirname + '/../../public/uploads/';
    const currentPhoto: { photo: string | null } | null = await prisma.user.findUnique({
      where: { id: req.body.id },
      select: {
        photo: true,
      },
    });
    const filenamePath: string = uploadDir + currentPhoto?.photo;

    if (invalidFields.length > 0) next(new HttpException(400, 'Additional fields not allowed.'));

    if (req.body.email) {
      if (!validEmail(req.body.email)) next(new HttpException(400, 'Invalid email.'));
      const isUserWithNewEmail = await prisma.user.findUnique({ where: { email: req.body.email } });

      if (isUserWithNewEmail) next(new HttpException(409, 'Email already taken.'));
    }

    if (req.body.password)
      if (validPassword(req.body.password)) req.body.password = await hashData(req.body.password);
      else next(new HttpException(400, 'Invalid password.'));

    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        req.body[key] = transformValuesToLowercase(req.body[key], key);
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.body.id },
      include: { books: true },
      data: { ...req.body, photo: req.file?.filename },
    });

    if (req.body.photo) {
      if (currentPhoto?.photo !== 'default.png' && fs.existsSync(filenamePath)) {
        fs.unlink(filenamePath, (err) => {
          console.log(err);
        });
      }
    }

    const { password, role, createdAt, updatedAt, ...others } = updatedUser;

    res.json(others);
  } catch (error) {
    next(new HttpException(500, "Couldn't update user."));
  }
};

const deleteUser: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const currentPhoto: { photo: string | null } | null = await prisma.user.findUnique({
      where: { id: req.body.id },
      select: {
        photo: true,
      },
    });
    const uploadDir = __dirname + '/../../public/uploads/';
    const filenamePath: string = uploadDir + currentPhoto?.photo;
    if (currentPhoto?.photo !== 'default.png' && fs.existsSync(filenamePath)) {
      fs.unlink(filenamePath, (err) => {
        console.log(err);
      });
    }

    const deletedUser: IUser = await prisma.user.delete({
      where: { id: id },
    });

    res.json(deletedUser);
  } catch (error) {
    next(new HttpException(500, "Couldn't delete user."));
  }
};

const _ = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

export default _;
