export interface IAuthPassword {
  salt: string;
  passwordHash: string;
  passwordExpired: Date;
}

export interface IAuthPayloadOptions {
  loginDate: Date;
}

export interface IAuthRefreshTokenOptions {
  notBeforeExpirationTime?: number | string;
  rememberMe?: boolean;
}
