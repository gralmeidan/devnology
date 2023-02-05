import { Request, Response } from 'express';
import OrderService from '../services/order.service';
import HTTP_STATUS from 'http-status-codes';

export default class OrderController {
  constructor(protected service = new OrderService()) {}

  private getUser = (req: Request) => {
    if (!req.user) {
      throw new Error('User was not provided!');
    }

    return req.user;
  };

  public placeOrder = async (req: Request, res: Response) => {
    const user = this.getUser(req);

    const response = await this.service.placeOrder({
      ...req.body,
      userId: user.id,
    });

    res.status(HTTP_STATUS.CREATED).json(response);
  };

  public getOrdersByRequestingUser = async (req: Request, res: Response) => {
    const user = this.getUser(req);

    const response = await this.service.findByUser(user.id);

    res.status(HTTP_STATUS.OK).json(response);
  };
}
