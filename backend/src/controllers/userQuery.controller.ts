import { RequestHandler, Request, Response, NextFunction } from "express"
import prisma from "../../prisma/lib/prisma";
import HttpException from "../config/exceptions/HttpException";

const getUserBooks: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        books: true,
      }
    });

    res.json(user!.books);
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const getBookTypes: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findMany({
      select: {
        books: {
          select: {
            type: true
          }
        },
      }
    });

    res.json(user);
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const _ = {
  getUserBooks,
  getBookTypes
}

export default _;