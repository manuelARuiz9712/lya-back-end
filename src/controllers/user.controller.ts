import { Body, Controller, Get, Post,Put, Res, HttpStatus, Param, Delete, Patch, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto, UpdateUserInfo } from 'dto/user.dto';
import { UserService } from 'services/user.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { KEY_ACCESS_TOKEN } from 'utils/contants';
import { AuthService } from 'auth/auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from 'dto/response.dto';
import { userInterface } from 'interfaces/user.interface';

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService,private authService: AuthService) {}


  @ApiResponse({
    type:ResponseDto
   })
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
  
  @ApiResponse({
   type:ResponseDto
  })
  @UseGuards(JwtAuthGuard)
  @Put("/:id") 
  async updateInfo( @Body() updateDto:UpdateUserInfo,@Param('id')id:string,@Res() res: Response,@Req() req:Request){

    let result = await this.userService.updateUser(id,updateDto);
   
    if ( result.status === true ){
      res.cookie(KEY_ACCESS_TOKEN,this.authService.login(result.value).access_token);
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

  @ApiResponse({
    type:ResponseDto
   })
  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  async deleteUser (@Param('id')id:string,@Res() res: Response,@Req() req:Request){

    let result = await this.userService.deleteUser(id);

    if ( result.status === true ){
      if ( (req.user as userInterface)._id ===  id ){
        
        res.cookie(KEY_ACCESS_TOKEN,"");
      }

     
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

  @ApiResponse({
    type:ResponseDto
   })
  @UseGuards(JwtAuthGuard)
  @Patch("/:id/active")
  async updateUser (@Param('id')id:string,@Res() res: Response,@Req() req:Request){
    let result = await this.userService.activateAcount(id);
    

    if ( result.status){

      res.cookie(KEY_ACCESS_TOKEN,this.authService.login(result.value).access_token);

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

  @ApiResponse({
    type:ResponseDto
   })
  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  async getUserInfo(@Param('id')id:string,@Res() res: Response,@Req() req:Request){

    let isActiveUser = await this.userService.IsActiveUser(id);
    
    if ( isActiveUser ){

      let result = await this.userService.getInfoUser(id);

      res.status(HttpStatus.OK).json({
        statusCode:200,
        message:result.msg,
        value:result.value
      });

    }else{

      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode:400,
        message:"No es posible obtener los datos del usuario",
      });

    }

  }



}
