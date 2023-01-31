import { registerAs } from '@nestjs/config';
import { version } from 'package.json';

import { ENUM_APP_ENVIRONMENT } from 'src/utils/data/constants';

const {
  APP_NAME,
  APP_ENV,
  APP_LANGUAGE,
  JOB_ENABLE,
  HTTP_VERSIONING_ENABLE,
  HTTP_VERSION,
  HTTP_ENABLE,
  HTTP_HOST,
  HTTP_PORT,
} = process.env;

export default registerAs(
  'app',
  (): Record<string, any> => ({
    name: APP_NAME ?? 'StockSports',
    env: APP_ENV ?? ENUM_APP_ENVIRONMENT.DEVELOPMENT,
    language: APP_LANGUAGE?.split(',') ?? [APP_LANGUAGE],

    repoVersion: version,
    versioning: {
      enable: Boolean(HTTP_VERSIONING_ENABLE),
      prefix: 'v',
      version: HTTP_VERSION || '1',
    },

    globalPrefix: '/api',
    http: {
      enable: Boolean(HTTP_ENABLE),
      host: HTTP_HOST || 'localhost',
      port: HTTP_PORT ? +HTTP_PORT : 8080,
    },

    jobEnable: Boolean(JOB_ENABLE),
  }),
);
