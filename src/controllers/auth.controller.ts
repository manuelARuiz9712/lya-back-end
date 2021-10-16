import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from 'auth/auth.service';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { LoginUserDto } from 'dto/user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
      type:LoginUserDto,
      required:true
      
  })
  
  @UseGuards(LocalAuthGuard)
  @Post('/authorization')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
