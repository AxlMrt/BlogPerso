import { Request, Response } from "express"
import prisma from "../../lib/prisma";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
}

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) }
  });

  res.json(user);
}

const createUser = async (req: Request, res: Response) => {
  const { email, firstName, lastName }: { email: string, firstName: string, lastName: string } = req.body;

  const newUser = await prisma.user.create({
    data: { email, firstName, lastName },
  });

  res.status(201).json(newUser);
}

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, firstName, lastName, isAdmin } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { email, firstName, lastName, isAdmin }
  });

  res.json(updatedUser);
}

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedUser = prisma.user.delete({
    where: { id: parseInt(id) },
  });

  res.json(deletedUser);
}

const _ = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}

export default _;