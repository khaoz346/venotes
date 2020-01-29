import { ErrorHandler, Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors';

export const errorHandler: ErrorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  return res.status(err.status).send(err.message);
};
