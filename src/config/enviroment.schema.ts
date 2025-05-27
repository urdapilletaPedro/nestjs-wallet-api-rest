import * as Joi from 'joi';

export const enviromentSchema = Joi.object({
  MONGO_URI: Joi.string().uri().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().default('1h'),

  PORT: Joi.number().default(8000),
});
