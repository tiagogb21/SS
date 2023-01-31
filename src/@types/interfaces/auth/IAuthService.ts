import {
  IAuthPassword,
  IAuthPayloadOptions,
  IAuthRefreshTokenOptions,
} from './IAuth';

export interface IAuthService {
  validateUser(passwordString: string, passwordHash: string): Promise<boolean>;

  createPassword(password: string): Promise<IAuthPassword>;

  checkPasswordExpired(passwordExpired: Date): Promise<boolean>;

  getTokenType(): Promise<string>;

  getIssuer(): Promise<string>;

  getAudience(): Promise<string>;

  getSubject(): Promise<string>;

  getPayloadEncryption(): Promise<boolean>;
}
