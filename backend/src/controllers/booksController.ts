import { Request, Response, NextFunction } from "express"
import prisma from "../prisma/lib/prisma";
import HttpException from "../config/exceptions/HttpException";
import { IRequestWithUser } from "../config/types";

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const getBook = async (req: Request, res: Response, next: NextFunction) => {
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

const createBook = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
  const { title, userMail } = req.body
  try {
    const newBook = await prisma.book.create({
      data: { 
        title,
        user: { connect: { email: userMail } }
       },
    });

    res.status(201).json(newBook);
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const updateBook = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    console.log(req.body)
    const updatedBook = await prisma.book.update({
      where: { id },
      data: req.body
    });

    console.log(updatedBook)

    res.json(updatedBook);
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const deleteBook = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
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