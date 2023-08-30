import HttpException from '@/config/exceptions/HttpException';
import prisma from 'prisma/lib/prisma';
import { Request, Response, NextFunction } from 'express';

const checkAdminRole = async (id: string) => {
  const user = await prisma?.user.findUnique({ where: { id } });

  return user?.role === 'ADMIN' ? true : false;
};

export const requireOwnershipOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userIdFromRequest = req.params.id;
  let loggedInUserId = req.body.id;

  console.log(req.body);

  if (req.body.user) {
    const parsed = JSON.parse(req.body.user);
    loggedInUserId = parsed.id;
  }

  const isAdmin = await checkAdminRole(userIdFromRequest);

  if (loggedInUserId === userIdFromRequest || isAdmin) {
    next();
  } else {
    next(new HttpException(403, 'Forbidden'));
  }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.role === 'ADMIN') {
    next();
  } else {
    next(new HttpException(403, 'Forbidden'));
  }
};
