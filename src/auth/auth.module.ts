import { Module } from '@nestjs/common';
import { Oauth2Strategy } from './strategy/oauth.strategy';
import { AuthController } from './auth.controller';

@Module({
  providers: [Oauth2Strategy],
  controllers: [AuthController],
})
export class AuthModule {}
