import { RequestHandler, Request, Response } from "express"
import bcrypt from "bcrypt";
import prisma from "../prisma/lib/prisma";
import createToken from "../utils/tokens";
import createCookie from "../utils/cookies";

const getAllUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error
    });
  }
}

const getUser: RequestHandler<{ id: string }> = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: id }
    });
  
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error
    });
  }
}

const createUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, password }: { email: string, firstName: string, lastName: string, password: string } = req.body;
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { email, firstName, lastName, password: cryptedPassword, photo: req.file?.path },
    });

    const tokenData = createToken(newUser);
    res.setHeader('Set-Cookie', [createCookie(tokenData)]);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Something went wrong",
      error
    });
  }
}

const updateUser: RequestHandler<{ id: string }> = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName }: { email: string, firstName: string, lastName: string } = req.body;
    let password: string = req.body.password;
    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { email, firstName, lastName, password, photo: req.file?.path }
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error
    });
  }
}

const deleteUser: RequestHandler<{ id: string }> = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({
      where: { id: id },
    });

    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error
    });
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