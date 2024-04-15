import { Response, Request, NextFunction } from 'express';

interface CustomError {
  message: string;
  code: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('Error occurred:', err);
  res.status(err.code).json({ status: err.code, error: err.message });
};
