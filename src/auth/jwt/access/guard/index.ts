import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ENUM_AUTH_STATUS_CODE_ERROR } from 'src/@types/enums/auth/StatusCode/error';

const { AUTH_JWT_ACCESS_TOKEN_ERROR } = ENUM_AUTH_STATUS_CODE_ERROR;

@Injectable()
export class AuthJwtAccessGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: Error, user: TUser, info: Error): TUser {
    if (err || !user) {
      throw new UnauthorizedException({
        statusCode: AUTH_JWT_ACCESS_TOKEN_ERROR,
        message: 'Access token unauthorized',
        error: err ? err.message : info.message,
      });
    }

    return user;
  }
}
