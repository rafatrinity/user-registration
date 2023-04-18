import * as Joi from 'joi';

export const envSchema = Joi.object({
  DB_USERNAME: Joi.string().required().default('root'),
  DB_PASSWORD: Joi.string().required().default('root'),
  DB_URI: Joi.string().required().default('mongodb://root:root@db:27017/'),
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
});
