/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, RequestHandler } from "express"
import prisma from "../../prisma/lib/prisma";
import HttpException from "../config/exceptions/HttpException";
import { IBook } from "../config/types";

const getAllBooks: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books: IBook[] = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const getBook: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const book: IBook | null = await prisma.book.findUnique({
      where: { id }
    });

    res.json(book)
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const createBook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { title, author, type, year, feedBack, publisher, userMail } = req.body;

  try {
    const newBook = await prisma.book.create({
      data: { 
        title,
        author,
        type,
        year,
        feedBack,
        publisher,
        user: { connect: { email: userMail } }
      },
      include: {
        user: {
          include: {
            books: true
          }
        }
      }
    });

    const { user, ...book } = newBook;
    const { password, role, createdAt, updatedAt, ...userInfo } = user!;

    res.status(201).json({ book, userInfo });
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const updateBook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { title, author, type, year, publisher, isRead, feedBack } = req.body;
  const { id } = req.params;
  try {
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title,
        author,
        type,
        year,
        publisher,
        feedBack,
        isRead
      },
      include: {
        user: {
          include: {
            books: true
          }
        }
      }
    });

    const { user, ...book } = updatedBook;
    const { password, role, createdAt, updatedAt, ...userInfo } = user!;

    res.json({ book, userInfo });
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const deleteBook: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deletedBook: IBook = await prisma.book.delete({
      where: { id: id },
    });

    res.json(deletedBook);
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const _ = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
}

export default _;