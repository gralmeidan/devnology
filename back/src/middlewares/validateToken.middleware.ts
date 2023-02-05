import { NextFunction, Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import RestError from '../errors/rest.error';
import * as jwt from 'jsonwebtoken';
import { getJwtSecret } from '../auth/getJwtSecret';

export default function validateToken(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.cookies['auth_token'];

  if (!token) {
    throw new RestError(HTTP_STATUS.UNAUTHORIZED, 'Token not found!');
  }

  try {
    const payload = jwt.verify(token, getJwtSecret()) as jwt.JwtPayload;

    req.user = {
      id: payload.id,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    };

    next();
  } catch (error) {
    throw new RestError(HTTP_STATUS.UNAUTHORIZED, 'Invalid token!');
  }
}
