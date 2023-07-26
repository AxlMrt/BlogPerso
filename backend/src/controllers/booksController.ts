import { Request, Response, NextFunction, RequestHandler } from "express"
import prisma from "../prisma/lib/prisma";
import HttpException from "../config/exceptions/HttpException";

const getAllBooks: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const getBook: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({
      where: { id }
    });

    res.json(book)
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const createBook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { title, author, type, year, publisher, userMail } = req.body;

  try {
    const newBook = await prisma.book.create({
      data: { 
        title,
        author,
        type,
        year,
        publisher,
        user: { connect: { email: userMail } }
       },
    });

    res.status(201).json(newBook);
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const updateBook: RequestHandler<{ id: string, author: string, type: string, year: number, publisher: string, isRead: boolean, feedback: number }> = async (req: Request, res: Response, next: NextFunction) => {
  const { title, author, type, year, publisher, isRead, feedback } = req.body;
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
        feedback,
        isRead
      },
    });

    res.json(updatedBook);
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const deleteBook: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const deletedBook = await prisma.book.delete({
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