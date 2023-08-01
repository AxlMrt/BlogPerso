import { RequestHandler, Request, Response, NextFunction } from "express"
import bcrypt from "bcrypt";
import prisma from "../../prisma/lib/prisma";
import createToken from "../utils/tokens";
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
    const newUser = await prisma.user.create({
      data: { 
        ...req.body,
        password: cryptedPassword,
        photo: req.file?.path
      },
    });

    const tokenData = createToken(newUser);
    res.setHeader('Set-Cookie', [createCookie(tokenData)]);
    res.status(201).json({ newUser, tokenData });
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const updateUser: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  let password: string = req.body.password;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { ...req.body, password, photo: req.file?.path }
    });

    res.json(updatedUser);
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