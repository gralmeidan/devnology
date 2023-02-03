import * as Joi from 'joi';

const productSchema = {
  id: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
  provider: Joi.string().required(),
};

const productInputSchema = Joi.object(productSchema);

export { productInputSchema };
