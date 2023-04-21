import * as Joi from 'joi';

export const envSchema = Joi.object({
  DB_USERNAME: Joi.string().required().default('root'),
  DB_PASSWORD: Joi.string().required().default('root'),
  DB_URI: Joi.string().required().default('mongodb://root:root@mongo:27017/'),
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DB_KEYFILE: Joi.string().required().default('mysecretkey'),
  DB_NAME: Joi.string().required().default('users'),
  MONGO_INITDB_ROOT_USERNAME: Joi.string().required().default('root'),
  MONGO_INITDB_ROOT_PASSWORD: Joi.string().required().default('root'),
  RABBITMQ_USER: Joi.string().required().default('root'),
  RABBITMQ_PASS: Joi.string().required().default('root'),
});
