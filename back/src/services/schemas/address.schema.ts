import * as Joi from 'joi';
import utilsSchema from './utils/utils.schema';

const addressSchema = {
  userId: utilsSchema.id,
  street: utilsSchema.str,
  number: utilsSchema.str,
  city: utilsSchema.str,
  state: Joi.string().length(2).required(),
  cep: Joi.string()
    .length(9)
    .pattern(/^\d{5}-\d{3}$/)
    .required(),
};

const newAddressSchema = Joi.object(addressSchema);

export { newAddressSchema };
