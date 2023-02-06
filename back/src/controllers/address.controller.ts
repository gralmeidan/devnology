import { Request, Response } from 'express';
import AddressService from '../services/address.service';

export default class AddressController {
  constructor(protected service = new AddressService()) {}

  private getUser = (req: Request) => {
    if (!req.user) {
      throw new Error('User was not provided!');
    }

    return req.user;
  };

  public insert = async (req: Request, res: Response) => {
    const resp = await this.service.insert({
      ...req.body,
      userId: this.getUser(req).id,
    });

    res.status(201).json(resp);
  };

  public getByRequestingUser = async (req: Request, res: Response) => {
    const resp = await this.service.findByUser(this.getUser(req).id);
    res.status(200).json(resp);
  };
}
