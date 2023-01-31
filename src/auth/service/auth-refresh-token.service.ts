import { ConfigService } from '@nestjs/config';
import { IAuthPayloadOptions } from 'src/@types/interfaces/auth/IAuth';

import { IAuthRefreshTokenOptions } from 'src/@types/interfaces/auth/IAuth';
import {
  ICreatePayloadRefreshToken,
  ITokenService,
} from 'src/@types/interfaces/auth/ITokenService';
import { HelperEncryptionService } from 'src/helper/services/encryption.service';

export class AuthRefreshToken
  implements ITokenService, ICreatePayloadRefreshToken
{
  private readonly refreshTokenSecretKey: string;
  private readonly refreshTokenExpirationTime: number;
  private readonly refreshTokenExpirationTimeRememberMe: number;
  private readonly refreshTokenNotBeforeExpirationTime: number;
  private readonly refreshTokenEncryptKey: string;
  private readonly refreshTokenEncryptIv: string;

  private readonly audience: string;
  private readonly issuer: string;
  private readonly subject: string;

  constructor(
    private readonly helperEncryptionService: HelperEncryptionService,
    private readonly configService: ConfigService,
  ) {
    this.refreshTokenSecretKey = this.configService.get<string>(
      'auth.refreshToken.secretKey',
    );
    this.refreshTokenExpirationTime = this.configService.get<number>(
      'auth.refreshToken.expirationTime',
    );
    this.refreshTokenExpirationTimeRememberMe = this.configService.get<number>(
      'auth.refreshToken.expirationTimeRememberMe',
    );
    this.refreshTokenNotBeforeExpirationTime = this.configService.get<number>(
      'auth.refreshToken.notBeforeExpirationTime',
    );
    this.refreshTokenEncryptKey = this.configService.get<string>(
      'auth.refreshToken.encryptKey',
    );
    this.refreshTokenEncryptIv = this.configService.get<string>(
      'auth.refreshToken.encryptIv',
    );
  }

  async encrypt(payload: Record<string, any>): Promise<string> {
    return this.helperEncryptionService.aes256Encrypt(
      payload,
      this.refreshTokenEncryptKey,
      this.refreshTokenEncryptIv,
    );
  }

  async decrypt({ data }: Record<string, any>): Promise<Record<string, any>> {
    return this.helperEncryptionService.aes256Decrypt(
      data,
      this.refreshTokenEncryptKey,
      this.refreshTokenEncryptIv,
    ) as Record<string, any>;
  }

  async create(
    payloadHashed: string | Record<string, any>,
    options?: IAuthRefreshTokenOptions,
  ): Promise<string> {
    return this.helperEncryptionService.jwtEncrypt(
      { data: payloadHashed },
      {
        secretKey: this.refreshTokenSecretKey,
        expiredIn: options?.rememberMe
          ? this.refreshTokenExpirationTimeRememberMe
          : this.refreshTokenExpirationTime,
        notBefore:
          options?.notBeforeExpirationTime ??
          this.refreshTokenNotBeforeExpirationTime,
        audience: this.audience,
        issuer: this.issuer,
        subject: this.subject,
      },
    );
  }

  async validate(token: string): Promise<boolean> {
    return this.helperEncryptionService.jwtVerify(token, {
      secretKey: this.refreshTokenSecretKey,
      audience: this.audience,
      issuer: this.issuer,
      subject: this.subject,
    });
  }

  async payload(token: string): Promise<Record<string, any>> {
    return this.helperEncryptionService.jwtDecrypt(token);
  }

  async getExpirationTime(rememberMe?: boolean): Promise<number> {
    return rememberMe
      ? this.refreshTokenExpirationTimeRememberMe
      : this.refreshTokenExpirationTime;
  }

  async createPayloadRefreshToken(
    _id: string,
    rememberMe: boolean,
    options?: IAuthPayloadOptions,
  ): Promise<Record<string, any>> {
    return {
      _id,
      rememberMe,
      loginDate: options?.loginDate,
    };
  }
}
