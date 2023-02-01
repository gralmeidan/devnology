import { CookieOptions, Request, Response } from 'express';
import UserService from '../services/user.service';
import generateToken from '../auth/generateToken';
import HTTP_STATUS from 'http-status-codes';

export default class UserController {
  constructor(protected service = new UserService()) {}

  private cookieOptions = (): CookieOptions => ({
    httpOnly: true,
    sameSite: 'strict',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // a week
  });

  public signUp = async (req: Request, res: Response) => {
    const response = await this.service.insert(req.body);
    const token = generateToken(response);

    res.cookie('auth_token', token, this.cookieOptions());
    res.status(HTTP_STATUS.CREATED).json(response);
  };

  public signIn = async (req: Request, res: Response) => {
    const response = await this.service.findByEmailAndPassword(req.body);
    const token = generateToken(response);

    res.cookie('auth_token', token, this.cookieOptions());
    res.status(HTTP_STATUS.OK).json(response);
  };
}
