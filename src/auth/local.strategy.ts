import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userDocument',
      passwordField:"userPassword"
    });
  }

  async validate(userDocument: string,userPassword : string): Promise<any> {
 
    const user = await this.authService.validateUser(userDocument, userPassword);

    if (!user) {
      
      throw new UnauthorizedException();
    }
    return user;
  }
}