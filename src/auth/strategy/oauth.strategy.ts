import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-oauth2';

@Injectable()
export class Oauth2Strategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log('oauth strategy');
    super({
      authorizationURL: 'https://github.com/login/oauth/authorize',
      tokenURL: 'https://github.com/login/oauth/access_token',
      clientID: '4ce78ebc409c3e340965',
      clientSecret: '8e73a88b2232d38dc40b8bd91cdb39acdb80d241',
      callbackURL: 'http://localhost:3000/api/auth/redirect',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('here validate', accessToken, refreshToken, profile);
  }
}
