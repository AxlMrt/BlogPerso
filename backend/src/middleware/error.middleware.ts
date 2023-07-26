import { ErrorRequestHandler, Request, Response } from "express";
import HttpException from "../config/exceptions/HttpException";

const errorMiddleWare: ErrorRequestHandler = (error: HttpException, req: Request, res: Response) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  res.status(status)
     .json({
    status,
    message
  });
}

export default errorMiddleWare;