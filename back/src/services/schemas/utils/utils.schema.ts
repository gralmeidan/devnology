import * as Joi from 'joi';

const id = Joi.number().integer().min(1).required();
const str = Joi.string().max(255).required();
const int = Joi.number().integer().required();

const utilsSchema = {
  id,
  str,
  int,
};

export default utilsSchema;
