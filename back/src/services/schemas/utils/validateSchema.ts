import * as Joi from 'joi';
import RestError from '../../../errors/rest.error';
import HTTP_STATUS from 'http-status-codes';

export default function validateSchema<T>(schema: Joi.Schema, object: unknown) {
  const { error, value } = schema.validate(object);

  if (error) {
    throw new RestError(HTTP_STATUS.UNPROCESSABLE_ENTITY, error.message);
  }

  return value as T;
}
