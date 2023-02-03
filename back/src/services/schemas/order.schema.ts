import * as Joi from 'joi';
import { productInputSchema } from './product.schema';

const orderSchema = {
  userId: Joi.number().integer().min(1).required(),
  totalPrice: Joi.number().positive().required(),
  products: Joi.array().items(productInputSchema).min(1).required(),
};

const newOrderSchema = Joi.object(orderSchema);

export { newOrderSchema };
