import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'auth/auth.service';
import { LocalAuthGuard } from 'auth/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/authorization')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
