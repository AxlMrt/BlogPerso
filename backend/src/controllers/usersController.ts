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
      message: "Something went wrong.",
    });
  }
}

const getUser: RequestHandler<{ id: string }> = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
  
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

const createUser: RequestHandler = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password }: { email: string, firstName: string, lastName: string, password: string } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { email, firstName, lastName, password: cryptedPassword }, 
    });

    const tokenData = createToken(newUser);
    res.setHeader('Set-Cookie', [createCookie(tokenData)]);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

const updateUser: RequestHandler<{ id: string }> = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, firstName, lastName }: { email: string, firstName: string, lastName: string } = req.body;
  let password: string = req.body.password
  try {
    if (password) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { email, firstName, lastName, password }
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

const deleteUser: RequestHandler<{ id: string }> = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong.",
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