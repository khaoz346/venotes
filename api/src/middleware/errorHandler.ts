import { ErrorHandler } from 'express';

export const errorHandler: ErrorHandler = (err, _req, res, _next) => {
  console.log(err);
  return res.status(err.status).send(err.message);
};
