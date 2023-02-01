import { NextFunction, Request, Response } from 'express';
import RestError from '../errors/rest.error';

export default function handleError(
  err: RestError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof RestError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  console.log(err);
  return res.status(500).json({
    message: 'Something went wrong',
  });
}
