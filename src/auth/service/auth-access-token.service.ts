import { ConfigService } from '@nestjs/config';

import { HelperDateService } from 'src/helper/services/date.service';
import { HelperEncryptionService } from 'src/helper/services/encryption.service';
import { IAuthPayloadOptions } from 'src/@types/interfaces/auth/IAuth';
import {
  ICreatePayloadAccessToken,
  ITokenService,
} from 'src/@types/interfaces/auth/ITokenService';

export class AuthAccessToken
  implements ITokenService, ICreatePayloadAccessToken
{
  private readonly accessTokenSecretKey: string;
  private readonly accessTokenExpirationTime: number;
  private readonly accessTokenNotBeforeExpirationTime: number;
  private readonly accessTokenEncryptKey: string;
  private readonly accessTokenEncryptIv: string;

  private readonly audience: string;
  private readonly issuer: string;
  private readonly subject: string;

  constructor(
    private readonly helperDateService: HelperDateService,
    private readonly helperEncryptionService: HelperEncryptionService,
    private readonly configService: ConfigService,
  ) {
    this.accessTokenSecretKey = this.configService.get<string>(
      'auth.accessToken.secretKey',
    );
    this.accessTokenExpirationTime = this.configService.get<number>(
      'auth.accessToken.expirationTime',
    );
    this.accessTokenNotBeforeExpirationTime = this.configService.get<number>(
      'auth.accessToken.notBeforeExpirationTime',
    );
    this.accessTokenEncryptKey = this.configService.get<string>(
      'auth.accessToken.encryptKey',
    );
    this.accessTokenEncryptIv = this.configService.get<string>(
      'auth.accessToken.encryptIv',
    );

    this.subject = this.configService.get<string>('auth.subject');
    this.audience = this.configService.get<string>('auth.audience');
    this.issuer = this.configService.get<string>('auth.issuer');
  }

  async encrypt(payload: Record<string, any>): Promise<string> {
    return this.helperEncryptionService.aes256Encrypt(
      payload,
      this.accessTokenEncryptKey,
      this.accessTokenEncryptIv,
    );
  }

  async decrypt({ data }: Record<string, any>): Promise<Record<string, any>> {
    return this.helperEncryptionService.aes256Decrypt(
      data,
      this.accessTokenEncryptKey,
      this.accessTokenEncryptIv,
    ) as Record<string, any>;
  }

  async create(payloadHashed: string | Record<string, any>): Promise<string> {
    return this.helperEncryptionService.jwtEncrypt(
      { data: payloadHashed },
      {
        secretKey: this.accessTokenSecretKey,
        expiredIn: this.accessTokenExpirationTime,
        notBefore: this.accessTokenNotBeforeExpirationTime,
        audience: this.audience,
        issuer: this.issuer,
        subject: this.subject,
      },
    );
  }

  async validate(token: string): Promise<boolean> {
    return this.helperEncryptionService.jwtVerify(token, {
      secretKey: this.accessTokenSecretKey,
      audience: this.audience,
      issuer: this.issuer,
      subject: this.subject,
    });
  }

  async createPayloadAccessToken(
    data: Record<string, any>,
    rememberMe: boolean,
    options?: IAuthPayloadOptions,
  ): Promise<Record<string, any>> {
    return {
      ...data,
      rememberMe,
      loginDate: options?.loginDate ?? this.helperDateService.create(),
    };
  }

  async payload(token: string): Promise<Record<string, any>> {
    return this.helperEncryptionService.jwtDecrypt(token);
  }

  async getExpirationTime(): Promise<number> {
    return this.accessTokenExpirationTime;
  }
}
