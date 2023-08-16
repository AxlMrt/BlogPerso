import { RequestHandler, Request, Response, NextFunction } from "express"
import bcrypt from "bcrypt";
import prisma from "../../prisma/lib/prisma";
import tokensFn from "../utils/tokens";
import createCookie from "../utils/cookies";
import HttpException from "../config/exceptions/HttpException";

const getAllUsers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const getUser: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { books: true }
    });
    
    res.json(user);
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const salt = await bcrypt.genSalt(10);
  const cryptedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (user)
      next(new HttpException(409, "Already exist"));


    const newUser = await prisma.user.create({
      data: { 
        ...req.body,
        password: cryptedPassword,
        photo: req.file?.path
      },
    });

    const tokenData = tokensFn.createToken(newUser);
    const refreshTokenData = tokensFn.createRefreshToken(newUser);
    const { password, role, createdAt, updatedAt, ...others } = newUser;

    res.setHeader('Set-Cookie', [createCookie(tokenData)]);
    res.status(201).json({ others, tokenData, refreshTokenData });
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const updateUser: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (req.body.user)
    req.body = JSON.parse(req.body.user);

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      include: { books: true },
      data: { ...req.body, password: req.body.password, photo: req.file?.filename }
    });

    const { password, role, createdAt, updatedAt, ...others } = updatedUser;
  
    res.json(others);
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const deleteUser: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: id },
    });

    res.json(deletedUser);
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const _ = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}

export default _;