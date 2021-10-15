import { Body, Controller, Get, Post,Put, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateUserDto, UpdateUserInfo } from 'dto/user.dto';
import { UserService } from 'services/user.service';
import {ResponseInt} from "interfaces/response.interface";
import { Response } from 'express';

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
        message:"El usuario ha sido registrado con exito",
        value:{id:result.value}

    });


   
  }
  @Put("/updateInfo/:id")
  async updateInfo( @Body() updateDto:UpdateUserInfo,@Param('id')id:string,@Res() res: Response){

    let result = await this.userService.updateUser(id,updateDto);

    if ( result.status === true ){
      res.status(HttpStatus.OK).json({
        statusCode:200,
        message:"Usuario editado",
      });

    }else{
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode:400,
        message:result.msg,
      });
    }


  }
}
