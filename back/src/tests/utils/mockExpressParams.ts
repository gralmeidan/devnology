import { NextFunction, Request, Response } from 'express';
import * as Sinon from 'sinon';

export default function mockExpressParams(req = {}) {
  const res = {
    cookie: Sinon.stub(),
    json: Sinon.stub(),
  } as any;
  res.status = Sinon.stub().returns(res);

  return {
    req: req as Request,
    res: res as Response,
    next: Sinon.stub() as unknown as NextFunction,
  };
}
