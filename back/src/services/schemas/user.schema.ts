import * as Joi from 'joi';

const userSchema = {
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).required(),
  password: Joi.string().max(255).required(),
  email: Joi.string()
    .max(255)
    .pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required(),
};

const signInSchema = Joi.object({
  email: userSchema.email,
  password: userSchema.password,
});

const newUserSchema = Joi.object(userSchema);

export { newUserSchema, signInSchema };
