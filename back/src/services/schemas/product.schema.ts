import * as Joi from 'joi';
import utilsSchema from './utils/utils.schema';

const productSchema = {
  id: utilsSchema.id,
  quantity: utilsSchema.int.min(1),
  provider: utilsSchema.str,
};

const productInputSchema = Joi.object(productSchema);

export { productInputSchema };
