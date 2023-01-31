import { registerAs } from '@nestjs/config';

const {
  AUTH_JWT_ACCESS_TOKEN_SECRET_KEY,
  AUTH_JWT_ACCESS_TOKEN_EXPIRED,
  AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY,
  AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV,
  AUTH_JWT_REFRESH_TOKEN_SECRET_KEY,
  AUTH_JWT_REFRESH_TOKEN_EXPIRED,
  AUTH_JWT_REFRESH_TOKEN_REMEMBER_ME_EXPIRED,
  AUTH_JWT_REFRESH_TOKEN_NOT_BEFORE_EXPIRATION,
  AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY,
  AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV,
  AUTH_JWT_SUBJECT,
  AUTH_JWT_AUDIENCE,
  AUTH_JWT_ISSUER,
  AUTH_JWT_PAYLOAD_ENCRYPT,
  AUTH_PERMISSION_TOKEN_SECRET_KEY,
  AUTH_PAYLOAD_PERMISSION_TOKEN_ENCRYPT_KEY,
  AUTH_PERMISSION_TOKEN_EXPIRED,
  AUTH_PAYLOAD_PERMISSION_TOKEN_ENCRYPT_IV,
} = process.env;

export default registerAs(
  'auth',
  (): Record<string, any> => ({
    // --> ACCESS TOKEN
    accessToken: {
      secretKey: AUTH_JWT_ACCESS_TOKEN_SECRET_KEY,
      expirationTime: AUTH_JWT_ACCESS_TOKEN_EXPIRED || '15m',
      notBeforeExpirationTime: '0',
      // ENCRYPT
      encryptKey: AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_KEY,
      encryptIv: AUTH_JWT_PAYLOAD_ACCESS_TOKEN_ENCRYPT_IV,
    },

    // --> REFRESH TOKEN
    refreshToken: {
      secretKey: AUTH_JWT_REFRESH_TOKEN_SECRET_KEY,
      expirationTime: AUTH_JWT_REFRESH_TOKEN_EXPIRED || '7d',
      expirationTimeRememberMe:
        AUTH_JWT_REFRESH_TOKEN_REMEMBER_ME_EXPIRED || '30d',
      notBeforeExpirationTime:
        AUTH_JWT_REFRESH_TOKEN_NOT_BEFORE_EXPIRATION || '15m',
      // ENCRYPT
      encryptKey: AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_KEY,
      encryptIv: AUTH_JWT_PAYLOAD_REFRESH_TOKEN_ENCRYPT_IV,
    },

    // --> PERMISSION TOKEN
    permissionToken: {
      headerName: 'x-permission-token',
      secretKey: AUTH_PERMISSION_TOKEN_SECRET_KEY || '123456',
      expirationTime: AUTH_PERMISSION_TOKEN_EXPIRED || '5m',
      notBeforeExpirationTime: '0',
      // ENCRYPT
      encryptKey: AUTH_PAYLOAD_PERMISSION_TOKEN_ENCRYPT_KEY,
      encryptIv: AUTH_PAYLOAD_PERMISSION_TOKEN_ENCRYPT_IV,
    },

    subject: AUTH_JWT_SUBJECT || 'StockSportsDevelopment',
    audience: AUTH_JWT_AUDIENCE || 'https://example.com',
    issuer: AUTH_JWT_ISSUER || 'StockSports',
    prefixAuthorization: 'Bearer',
    payloadEncryption: AUTH_JWT_PAYLOAD_ENCRYPT === 'true' ? true : false,

    password: {
      attempt: true,
      maxAttempt: 3,
      saltLength: 8,
      expiredIn: '182d',
    },
  }),
);
