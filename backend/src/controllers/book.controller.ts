/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, RequestHandler } from 'express';
import prisma from '../../prisma/lib/prisma';
import HttpException from '../config/exceptions/HttpException';
import { IBook } from '../config/types';
import { validEmail } from '@/utils/validation';

const getAllBooks: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books: IBook[] = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    next(new HttpException(500, 'Something went wrong'));
  }
};

const getBook: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const book: IBook | null = await prisma.book.findUnique({
      where: { id },
    });

    res.json(book);
  } catch (error) {
    next(new HttpException(500, 'Something went wrong'));
  }
};

const createBook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, type, year, feedBack, publisher, userMail } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email: userMail } });

    if (!validEmail(userMail))
      next(new HttpException(400, 'Invalid email.'));

    if (!existingUser)
      next(new HttpException(400, "User doesn't exist."));

    if (!title || !author)
      next(new HttpException(400, 'Missing data'));

    if (feedBack && !Number(feedBack) || year && !Number(year))
      next(new HttpException(400, 'Invalid number'));

    if (feedBack < 0 || feedBack > 5)
      next(new HttpException(400, 'Feedback invalid'));

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        type,
        year,
        feedBack,
        publisher,
        user: { connect: { email: userMail } },
      },
      include: {
        user: {
          include: {
            books: true,
          },
        },
      },
    });

    const { user, ...book } = newBook;
    const { password, role, createdAt, updatedAt, ...userInfo } = user!;

    res.status(201).json({ book, userInfo });
  } catch (error) {
    next(new HttpException(500, 'Something went wrong'));
  }
};

const updateBook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, type, year, publisher, isRead, feedBack, userId } = req.body;
    const { id } = req.params;

    if (!title || !author)
        next(new HttpException(400, 'Missing data'));

    if (feedBack && !Number(feedBack) || year && !Number(year))
      next(new HttpException(400, 'Invalid number'));

    if (feedBack < 0 || feedBack > 5)
      next(new HttpException(400, 'Feedback invalid'));

    const bookToUpdate = await prisma.book.findUnique({ where: { id } });
    const currentUser = await prisma.user.findUnique({ where: { id: userId } });
    
    if (!bookToUpdate)
      next(new HttpException(404, 'Book not found'));

    if (bookToUpdate!.userId !== userId && currentUser?.role !== "ADMIN")
      next(new HttpException(403, "User ID does not match book user ID"));

    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title,
        author,
        type,
        year,
        publisher,
        feedBack,
        isRead,
      },
      include: {
        user: {
          include: {
            books: true,
          },
        },
      },
    });

    const { user, ...book } = updatedBook;
    const { password, role, createdAt, updatedAt, ...userInfo } = user!;

    res.json({ book, userInfo });
  } catch (error) {
    next(new HttpException(500, 'Something went wrong'));
  }
};

const deleteBook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const bookToDelete = await prisma.book.findUnique({ where: { id } });

  if (!bookToDelete)
     next(new HttpException(404, 'Book not found'));

  try {
    const deletedBook: IBook = await prisma.book.delete({
      where: { id },
    });

    res.status(204).json(deletedBook);
  } catch (error) {
    next(new HttpException(500, 'Something went wrong'));
  }
};

const _ = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};

export default _;
