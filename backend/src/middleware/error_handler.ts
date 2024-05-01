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
  res
    .status(err.code || 500)
    .json({
      status: err.code || 500,
      error: err.message || 'Internal server error',
    });
};
