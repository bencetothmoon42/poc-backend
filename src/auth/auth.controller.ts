import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('login')
  handleLogin() {
    return { msg: 'login' };
  }

  @Get('callback')
  handleRedirect() {
    return { msg: 'callback' };
  }
}
