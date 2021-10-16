import { Controller, Get, Post, Request, UseGuards, Res, HttpStatus, Delete } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { LoginUserDto } from 'dto/user.dto';
import { Response } from 'express';
import { KEY_ACCESS_TOKEN } from 'utils/contants';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
      type:LoginUserDto,
      required:true
      
  })
  
  @UseGuards(LocalAuthGuard)
  @Post('/authorization')
  async login(@Request() req, @Res() res:Response) {
    let accessToken = this.authService.login(req.user).access_token;
    res.cookie(KEY_ACCESS_TOKEN,accessToken);

    return res.status(HttpStatus.OK).json(accessToken);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/authorization')
  async logOut(@Request() req, @Res() res:Response) {

   
    res.cookie(KEY_ACCESS_TOKEN,"");

    return res.status(HttpStatus.OK).send("Sesion eliminada");
  }
}
