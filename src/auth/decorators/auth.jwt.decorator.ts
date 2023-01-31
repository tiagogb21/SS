import {
  applyDecorators,
  SetMetadata,
  UseGuards,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

import { AUTH_ACCESS_FOR_META_KEY } from 'src/utils/data/constants/auth';
import { ENUM_AUTH_ACCESS_FOR } from 'src/@types/enums/auth/AccessFor';
import { AuthJwtAccessGuard } from '../jwt/access/guard';
import { AuthJwtRefreshGuard } from '../jwt/refresh/guard';
import { AuthPayloadAccessForGuard } from '../jwt/access/payload/AccessForGuard';

export const AuthJwtPayload = createParamDecorator(
  (data: string, ctx: ExecutionContext): Record<string, any> => {
    const { user } = ctx.switchToHttp().getRequest();
    return data ? user[data] : user;
  },
);

export const AuthJwtToken = createParamDecorator(
  (data: string, ctx: ExecutionContext): string => {
    const { headers } = ctx.switchToHttp().getRequest();
    const { authorization } = headers;
    const authorizations: string[] = authorization.split(' ');

    return authorizations.length >= 2 ? authorizations[1] : undefined;
  },
);

export function AuthJwtAccessProtected(): MethodDecorator {
  return applyDecorators(UseGuards(AuthJwtAccessGuard));
}

export function AuthJwtPublicAccessProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(AuthJwtAccessGuard, AuthPayloadAccessForGuard),
    SetMetadata(AUTH_ACCESS_FOR_META_KEY, [ENUM_AUTH_ACCESS_FOR.USER]),
  );
}

export function AuthJwtAdminAccessProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(AuthJwtAccessGuard, AuthPayloadAccessForGuard),
    SetMetadata(AUTH_ACCESS_FOR_META_KEY, [
      ENUM_AUTH_ACCESS_FOR.SUPER_ADMIN,
      ENUM_AUTH_ACCESS_FOR.ADMIN,
    ]),
  );
}

export function AuthJwtRefreshProtected(): MethodDecorator {
  return applyDecorators(UseGuards(AuthJwtRefreshGuard));
}
