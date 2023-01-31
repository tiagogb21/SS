import { IAuthPayloadOptions } from './IAuth';

export interface ITokenService {
  encrypt(payload: Record<string, any>): Promise<string>;

  decrypt(payload: Record<string, any>): Promise<Record<string, any>>;

  create(payloadHashed: string | Record<string, any>): Promise<string>;

  validate(token: string): Promise<boolean>;

  payload(token: string): Promise<Record<string, any>>;

  getExpirationTime(rememberMe?: boolean): Promise<number>;
}

export interface ICreatePayloadAccessToken {
  createPayloadAccessToken(
    data: Record<string, any>,
    rememberMe: boolean,
    options?: IAuthPayloadOptions,
  ): Promise<Record<string, any>>;
}

export interface ICreatePayloadRefreshToken {
  createPayloadRefreshToken(
    _id: string,
    rememberMe: boolean,
    options?: IAuthPayloadOptions,
  ): Promise<Record<string, any>>;
}

export interface ICreatePayloadPermissionToken {
  createPayloadPermissionToken(
    data: Record<string, any>,
  ): Promise<Record<string, any>>;
}
