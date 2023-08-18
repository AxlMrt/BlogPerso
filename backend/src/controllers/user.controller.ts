import { RequestHandler, Request, Response, NextFunction } from "express"
import prisma from "../../prisma/lib/prisma";
import tokensFn from "../utils/tokens";
import createCookie from "../utils/cookies";
import HttpException from "../config/exceptions/HttpException";
import { hashData } from "../utils/hashData";

const getAllUsers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(new HttpException(500, "Couldn't get all users."));
  }
}

const getUser: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { books: true }
    });

    if (!user)
      next(new HttpException(404, 'User not found.'));
    
    res.json(user);
  } catch (error) {
    next(new HttpException(500, "Couldn't get user."));
  }
}

const createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cryptedPassword = await hashData(req.body.password);
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (user)
      next(new HttpException(409, "User already exist"));

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
    next(new HttpException(500, "Couldn't create a new user."));
  }
}

const updateUser: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (req.body.user)
    req.body = JSON.parse(req.body.user);

  if (req.body.password)
    req.body.password = await hashData(req.body.password);

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      include: { books: true },
      data: { ...req.body, password: req.body.password, photo: req.file?.filename }
    });

    const { password, role, createdAt, updatedAt, ...others } = updatedUser;
  
    res.json(others);
  } catch (error) {
    next(new HttpException(500, "Couldn't update user."));
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
    next(new HttpException(500, "Couldn't delete user."));
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