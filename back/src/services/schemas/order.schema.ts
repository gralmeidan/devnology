import * as Joi from 'joi';
import { productInputSchema } from './product.schema';
import utilsSchema from './utils/utils.schema';

const orderSchema = {
  userId: utilsSchema.id,
  totalPrice: Joi.number().positive().required(),
  products: Joi.array().items(productInputSchema).min(1).required(),
};

const newOrderSchema = Joi.object(orderSchema);

export { newOrderSchema };
