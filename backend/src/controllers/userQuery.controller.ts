import { RequestHandler, Request, Response, NextFunction } from "express"
import prisma from "../../prisma/lib/prisma";
import HttpException from "../config/exceptions/HttpException";
const PER_PAGE = 8;

const getUserBooks: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const page = req.query.page;
  const search = req.query.search;
  const field: string = req.query.field as string;
  const order = req.query.order;
  const type = req.query.type;

  const currentPage = Math.max((Number(page) || 1), 1)
  const options = {
    take: PER_PAGE,
    skip: (currentPage - 1) * PER_PAGE,
    orderBy: {
      [field]: order
    },
    where: {}
  }

  if (search?.length)
    options.where = {
      title: {
        contains: search,
        mode: 'insensitive'
    }
    }
  
  if (type?.length)
    options.where = {
      type
    }

  try {
    const data = await prisma.user.findUnique({
      where: { id },
      select: {
        _count: {
          select: { books: true }
        },
        books: options,
      },
    });
    const total = data?._count.books;
    res.json({ books: data?.books, total, page, total_pages: (Math.ceil( total! / PER_PAGE)) });
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const getBookTypes: RequestHandler<{ id: string }> = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const books = await prisma.user.findUnique({
      where: { id },
      select: {
        books: {
          select: {
            type: true
          }
        },
      }
    });

    res.json(books!.books);
  } catch (error) {
    next(new HttpException(500, "Something went wrong"));
  }
}

const _ = {
  getUserBooks,
  getBookTypes
}

export default _;