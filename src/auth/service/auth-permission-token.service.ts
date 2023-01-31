import { ConfigService } from '@nestjs/config';
import {
  ICreatePayloadPermissionToken,
  ITokenService,
} from 'src/@types/interfaces/auth/ITokenService';

import { HelperEncryptionService } from 'src/helper/services/encryption.service';

export class AuthPermissionToken
  implements ITokenService, ICreatePayloadPermissionToken
{
  private readonly permissionTokenSecretToken: string;
  private readonly permissionTokenExpirationTime: number;
  private readonly permissionTokenNotBeforeExpirationTime: number;
  private readonly permissionTokenEncryptKey: string;
  private readonly permissionTokenEncryptIv: string;

  private readonly audience: string;
  private readonly issuer: string;
  private readonly subject: string;

  constructor(
    private readonly helperEncryptionService: HelperEncryptionService,
    private readonly configService: ConfigService,
  ) {
    this.permissionTokenSecretToken = this.configService.get<string>(
      'auth.permissionToken.secretKey',
    );
    this.permissionTokenExpirationTime = this.configService.get<number>(
      'auth.permissionToken.expirationTime',
    );
    this.permissionTokenNotBeforeExpirationTime =
      this.configService.get<number>(
        'auth.permissionToken.notBeforeExpirationTime',
      );
    this.permissionTokenEncryptKey = this.configService.get<string>(
      'auth.permissionToken.encryptKey',
    );
    this.permissionTokenEncryptIv = this.configService.get<string>(
      'auth.permissionToken.encryptIv',
    );
  }

  async encrypt(payload: Record<string, any>): Promise<string> {
    return this.helperEncryptionService.aes256Encrypt(
      payload,
      this.permissionTokenEncryptKey,
      this.permissionTokenEncryptIv,
    );
  }

  async decrypt({ data }: Record<string, any>): Promise<Record<string, any>> {
    return this.helperEncryptionService.aes256Decrypt(
      data,
      this.permissionTokenEncryptKey,
      this.permissionTokenEncryptIv,
    ) as Record<string, any>;
  }

  async create(payloadHashed: string | Record<string, any>): Promise<string> {
    return this.helperEncryptionService.jwtEncrypt(
      { data: payloadHashed },
      {
        secretKey: this.permissionTokenSecretToken,
        expiredIn: this.permissionTokenExpirationTime,
        notBefore: this.permissionTokenNotBeforeExpirationTime,
        audience: this.audience,
        issuer: this.issuer,
        subject: this.subject,
      },
    );
  }

  async validate(token: string): Promise<boolean> {
    return this.helperEncryptionService.jwtVerify(token, {
      secretKey: this.permissionTokenSecretToken,
      audience: this.audience,
      issuer: this.issuer,
      subject: this.subject,
    });
  }

  async payload(token: string): Promise<Record<string, any>> {
    return this.helperEncryptionService.jwtDecrypt(token);
  }

  async getExpirationTime(): Promise<number> {
    return this.permissionTokenExpirationTime;
  }

  async createPayloadPermissionToken(
    data: Record<string, any>,
  ): Promise<Record<string, any>> {
    return data;
  }
}
