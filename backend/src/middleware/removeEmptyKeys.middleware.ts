import { Request, Response, NextFunction } from 'express';

export const removeEmptyKeysFromBody = (req: Request, _res: Response, next: NextFunction) => {
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      if (req.body[key] === '') {
        delete req.body[key];
      }
    }
  }
  next();
};
