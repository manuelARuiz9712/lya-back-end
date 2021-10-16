import { Body, Controller, Get, Post,Put, Res, HttpStatus, Param, Delete, Patch, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto, UpdateUserInfo } from 'dto/user.dto';
import { UserService } from 'services/user.service';
import {ResponseInt} from "interfaces/response.interface";
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  async register(@Body() createUserDto:CreateUserDto,@Res() res: Response ) {
    let result = await this.userService.registerUser(createUserDto);

    if (result.status === false ){

       return res.status(HttpStatus.BAD_REQUEST).json({
            statusCode:400,
            message:result.msg,
    
        });
      

    }
   return res.status(HttpStatus.OK).json({
        statusCode:200,
        message:result.msg,
        value:{id:result.value}

    });


   
  }

  @UseGuards(JwtAuthGuard)
  @Put("/updateInfo/:id")
  async updateInfo( @Body() updateDto:UpdateUserInfo,@Param('id')id:string,@Res() res: Response){

    let result = await this.userService.updateUser(id,updateDto);

    if ( result.status === true ){
      res.status(HttpStatus.OK).json({
        statusCode:200,
        message:result.msg,
      });

    }else{
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode:400,
        message:result.msg,
      });
    }


  }

  @UseGuards(JwtAuthGuard)
  @Delete("/delete/:id")
  async deleteUser (@Param('id')id:string,@Res() res: Response){

    let result = await this.userService.deleteUser(id);

    if ( result.status === true ){

      res.status(HttpStatus.OK).json({
        statusCode:200,
        message:result.msg,
      });

    }else{

      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode:400,
        message:result.msg,
      });

    }

  }
  @UseGuards(JwtAuthGuard)
  @Patch("/:id/active")
  async updateUser (@Param('id')id:string,@Res() res: Response,@Req() req:Request){
    let result = await this.userService.activateAcount(id);
    console.log({user:req.user});

    if ( result.status){

      res.status(HttpStatus.OK).json({
        statusCode:200,
        message:result.msg,
      });

    }else{

      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode:400,
        message:result.msg,
      });

    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async getUserInfo(@Param('id')id:string,@Res() res: Response,@Req() req:Request){

    let result = await this.userService.getInfoUser(id);

    if ( result.status ){

      res.status(HttpStatus.OK).json({
        statusCode:200,
        message:result.msg,
        value:result.value
      });

    }else{
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode:400,
        message:result.msg,
      });
    }

  }



}
