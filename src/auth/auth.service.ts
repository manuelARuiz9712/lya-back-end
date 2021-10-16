import { Injectable } from '@nestjs/common';
import { UserService } from 'services/user.service'; 
import * as sha256 from "sha256";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,private jwtService: JwtService) {}

  async validateUser(document: string, pass: string): Promise<any> {
    const user = await this.usersService.existUser(document);
    
    if (user && user.userPassword === sha256(pass) ) {
      const { userPassword, ...result } = user.toObject();
      return result;
    }
    return null;
  }

   login(user: any) {
  
    return {
      access_token: this.jwtService.sign(user),
    };
  }

}