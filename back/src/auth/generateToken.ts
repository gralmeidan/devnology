import * as jwt from 'jsonwebtoken';
import User from '../types/user.type';
import { getJwtSecret } from './getJwtSecret';

export default function generateToken(
  user: Omit<User, 'password'> | { dataValues: Omit<User, 'password'> }
) {
  const secret = getJwtSecret();
  const payload = 'dataValues' in user ? user.dataValues : user;

  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });
}
