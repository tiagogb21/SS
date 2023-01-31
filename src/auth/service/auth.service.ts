import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IAuthPassword } from 'src/@types/interfaces/auth/IAuth';

import { IAuthService } from 'src/@types/interfaces/auth/IAuthService';
import { HelperDateService } from 'src/helper/services/date.service';
import { HelperHashService } from './hash.service';

@Injectable()
export class AuthService implements IAuthService {
  private readonly payloadEncryption: boolean;
  private readonly prefixAuthorization: string;
  private readonly audience: string;
  private readonly issuer: string;
  private readonly subject: string;

  private readonly passwordExpiredIn: number;
  private readonly passwordSaltLength: number;

  constructor(
    private readonly helperHashService: HelperHashService,
    private readonly helperDateService: HelperDateService,
    private readonly configService: ConfigService,
  ) {
    this.payloadEncryption = this.configService.get<boolean>(
      'auth.payloadEncryption',
    );
    this.prefixAuthorization = this.configService.get<string>(
      'auth.prefixAuthorization',
    );

    this.passwordExpiredIn = this.configService.get<number>(
      'auth.password.expiredIn',
    );
    this.passwordSaltLength = this.configService.get<number>(
      'auth.password.saltLength',
    );
  }

  async validateUser(
    passwordString: string,
    passwordHash: string,
  ): Promise<boolean> {
    return this.helperHashService.bcryptCompare(passwordString, passwordHash);
  }

  async createPassword(password: string): Promise<IAuthPassword> {
    const salt: string = this.helperHashService.randomSalt(
      this.passwordSaltLength,
    );

    const passwordExpired: Date = this.helperDateService.forwardInSeconds(
      this.passwordExpiredIn,
    );

    const passwordHash = this.helperHashService.bcrypt(password, salt);
    return {
      passwordHash,
      passwordExpired,
      salt,
    };
  }

  async checkPasswordExpired(passwordExpired: Date): Promise<boolean> {
    const today: Date = this.helperDateService.create();
    const passwordExpiredConvert: Date =
      this.helperDateService.create(passwordExpired);

    return today > passwordExpiredConvert;
  }

  async getTokenType(): Promise<string> {
    return this.prefixAuthorization;
  }

  async getIssuer(): Promise<string> {
    return this.issuer;
  }

  async getAudience(): Promise<string> {
    return this.audience;
  }

  async getSubject(): Promise<string> {
    return this.subject;
  }

  async getPayloadEncryption(): Promise<boolean> {
    return this.payloadEncryption;
  }
}
