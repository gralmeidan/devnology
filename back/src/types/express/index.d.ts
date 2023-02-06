import User from '../user.type';

declare global {
  namespace Express {
    export interface Request {
      user?: Required<Omit<User, 'password'>>;
    }
  }
}
