import * as Joi from 'joi';
import utilsSchema from './utils/utils.schema';

const userSchema = {
  firstName: utilsSchema.str,
  lastName: utilsSchema.str,
  password: utilsSchema.str,
  email: utilsSchema.str.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
};

const signInSchema = Joi.object({
  email: userSchema.email,
  password: userSchema.password,
});

const newUserSchema = Joi.object(userSchema);

export { newUserSchema, signInSchema };
