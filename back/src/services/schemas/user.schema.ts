import * as Joi from 'joi';

const newUserSchema = Joi.object({
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).required(),
  password: Joi.string().max(255).required(),
  email: Joi.string()
    .max(255)
    .pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required(),
});

export { newUserSchema };
