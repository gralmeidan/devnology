import { StatusCodes } from 'http-status-codes';

export default class RestError extends Error {
  constructor(protected _status: StatusCodes, message: string) {
    super(message);
  }

  public get status(): StatusCodes {
    return this._status;
  }
}
