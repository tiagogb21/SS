import Joi from 'joi';

// INTERFACES
import { ENUM_MESSAGE_LANGUAGE } from 'src/@types/enums/language/language.enum';
// CONSTANTS
import { ENUM_APP_ENVIRONMENT } from 'src/utils/data/constants';
import { APP_LANGUAGE } from 'src/utils/data/constants/language';

export const envValidation = Joi.object({
  APP_NAME: Joi.string().required(),
  APP_ENV: Joi.string()
    .valid(...Object.values(ENUM_APP_ENVIRONMENT))
    .default('development')
    .required(),
  APP_LANGUAGE: Joi.string()
    .valid(...Object.values(ENUM_MESSAGE_LANGUAGE))
    .default(APP_LANGUAGE)
    .required(),

  HTTP_ENABLE: Joi.boolean().default(true).required(),
  HTTP_HOST: [
    Joi.string().ip({ version: 'ipv4' }).required(),
    Joi.valid('localhost').required(),
  ],
  HTTP_PORT: Joi.number().default(3000).required(),
  HTTP_VERSIONING_ENABLE: Joi.boolean().default(true).required(),
  HTTP_VERSION: Joi.number().required(),

  DEBUGGER_HTTP_WRITE_INTO_FILE: Joi.boolean().default(false).required(),
  DEBUGGER_HTTP_WRITE_INTO_CONSOLE: Joi.boolean().default(false).required(),
  DEBUGGER_SYSTEM_WRITE_INTO_FILE: Joi.boolean().default(false).required(),
  DEBUGGER_SYSTEM_WRITE_INTO_CONSOLE: Joi.boolean().default(false).required(),

  JOB_ENABLE: Joi.boolean().default(false).required(),

  DATABASE_HOST: Joi.string().default('mongodb://localhost:27017').required(),
  DATABASE_NAME: Joi.string().default('ack').required(),
  DATABASE_USER: Joi.string().allow(null, '').optional(),
  DATABASE_PASSWORD: Joi.string().allow(null, '').optional(),
  DATABASE_DEBUG: Joi.boolean().default(false).required(),
  DATABASE_OPTIONS: Joi.string().allow(null, '').optional(),

  AUTH_JWT_SUBJECT: Joi.string().required(),
  AUTH_JWT_AUDIENCE: Joi.string().required(),
  AUTH_JWT_ISSUER: Joi.string().required(),

  AUTH_JWT_ACCESS_TOKEN_SECRET_KEY: Joi.string()
    .alphanum()
    .min(5)
    .max(50)
    .required(),
  AUTH_JWT_ACCESS_TOKEN_EXPIRED: Joi.string().default('15m').required(),

  AUTH_JWT_REFRESH_TOKEN_SECRET_KEY: Joi.string()
    .alphanum()
    .min(5)
    .max(50)
    .required(),
  AUTH_JWT_REFRESH_TOKEN_EXPIRED: Joi.string().default('7d').required(),
  AUTH_JWT_REFRESH_TOKEN_REMEMBER_ME_EXPIRED: Joi.string()
    .default('30d')
    .required(),
  AUTH_JWT_REFRESH_TOKEN_NOT_BEFORE_EXPIRATION: Joi.string()
    .default('15m')
    .required(),

  AUTH_PERMISSION_TOKEN_SECRET_KEY: Joi.string()
    .alphanum()
    .min(5)
    .max(50)
    .required(),
  AUTH_PERMISSION_TOKEN_EXPIRED: Joi.string().default('5m').required(),

  AUTH_JWT_PAYLOAD_ENCRYPT: Joi.boolean().default(false).required(),
  AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY: Joi.string()
    .allow(null, '')
    .min(20)
    .max(50)
    .optional(),
  AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV: Joi.string()
    .allow(null, '')
    .min(16)
    .max(50)
    .optional(),
  AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY: Joi.string()
    .allow(null, '')
    .min(20)
    .max(50)
    .optional(),
  AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV: Joi.string()
    .allow(null, '')
    .min(16)
    .max(50)
    .optional(),
  AUTH_PAYLOAD_PERMISSION_TOKEN_ENCRYPT_KEY: Joi.string()
    .allow(null, '')
    .min(20)
    .max(50)
    .optional(),
  AUTH_PAYLOAD_PERMISSION_TOKEN_ENCRYPT_IV: Joi.string()
    .allow(null, '')
    .min(16)
    .max(50)
    .optional(),

  AWS_CREDENTIAL_KEY: Joi.string().allow(null, '').optional(),
  AWS_CREDENTIAL_SECRET: Joi.string().allow(null, '').optional(),
  AWS_S3_REGION: Joi.string().allow(null, '').optional(),
  AWS_S3_BUCKET: Joi.string().allow(null, '').optional(),
});
