import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SECRET, KEY_ACCESS_TOKEN } from 'utils/contants';
import { userInterface } from 'interfaces/user.interface';
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
       // ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: true,
      secretOrKey: JWT_SECRET,
    });
  }

  private static extractJWT(req: RequestType): string | null {
    
    

    if (
      req.cookies &&
      KEY_ACCESS_TOKEN in req.cookies &&
      req.cookies[KEY_ACCESS_TOKEN].length > 0
    ) {
    
      return req.cookies[KEY_ACCESS_TOKEN];
    }

  
    return null;
  }

  async validate(payload: userInterface) {
    
    return payload;
  }
}