import { Module } from '@nestjs/common';
import { AuthJwtAccessStrategy } from './jwt/access/strategy';
import { AuthJwtRefreshStrategy } from './jwt/refresh/strategy';
import { AuthService } from './service/auth.service';

@Module({
  providers: [AuthService, AuthJwtAccessStrategy, AuthJwtRefreshStrategy],
  exports: [AuthService],
  controllers: [],
  imports: [],
})
export class AuthModule {}
