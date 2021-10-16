import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, LoginUserDto, UpdateUserInfo } from 'dto/user.dto';
import { Model } from 'mongoose';
import { UserDocument, User } from 'schemas/user.schema';
import { QueryResult } from 'interfaces/response.interface';
import * as sha256 from "sha256";

@Injectable()
export class UserService {

  constructor(@InjectModel('users') private userModel: Model<UserDocument>) {}

    existUser = (document:string)=>{
    return  this.userModel.findOne({userDocument:document});

   }
   getUserById = (id)=>{
    return  this.userModel.findById(id);
   }

  async registerUser(createUserDto:CreateUserDto):Promise<QueryResult>{
      
      let exist = await this.existUser(createUserDto.userDocument);
    
    
      if ( exist ){

          return {
            status:false,
            msg:"el usuario existe en base de datos",
            value:null
          };
      }else{
        createUserDto.userStatus = false;
        createUserDto.userPassword = sha256(createUserDto.userPassword);
       
        const createdCat = new this.userModel(createUserDto);
        let doc = await createdCat.save();
    
       
        return {
          status:true,
          msg:"usuario registrado",
          value:doc._id
        };
       
      }
  }
  async updateUser(id:string,updateInfo:UpdateUserInfo){
     
      let user = await this.getUserById(id);
    
      if ( user ){

        user.userDocument = updateInfo.userDocument?updateInfo.userDocument:user.userDocument;
        user.userName = updateInfo.userName?updateInfo.userName:user.userName;
       
        await user.save();
       
       return {
          status:true,
          msg:"El usuario ha sido editado",
          value:user.toObject()
        };
      }else{

        return {
          status:false,
          msg:"el usuario no  existe en base de datos",
          value:null
        };

      }

  }

  
  async deleteUser (id:string){

    let user = await this.getUserById(id);

    if ( !user ){

    return {
        status:false,
        msg:"el usuario no  existe en base de datos",
        value:null
      };

    }else{

     await user.delete();

    return {
        status:true,
        msg:"El usuario ha sido eliminado",
        value:null
      };


    }

  }

  async activateAcount(id:string){

    let user = await this.getUserById(id);

    if ( user ){

      user.userStatus = true;
      await user.save();
     
     return {
        status:true,
        msg:"El usuario ha sido activado",
        value:user.toObject()
      };


    }else{

      return {
        status:false,
        msg:"el usuario no  existe en base de datos",
        value:null
      };

    }

  }

  async IsActiveUser(id){

    let user = await this.getUserById(id);
    

    if (!user){
      return false;
    }
    if ( user.userStatus ){
      return true;
    }

    return false;

  }

  async LoginUser(LoginUser:LoginUserDto){

    let user = await this.existUser(LoginUser.userDocument);

    if (!user){

      return {
        status:false,
        msg:"Documento o contraseña incorrecta",
        value:null
      };
    }
    if ( user.userPassword !== sha256(LoginUser.userPassword) ){

      return {
        status:false,
        msg:"Documento o contraseña incorrecta",
        value:null
      };

    }

  }

  async getInfoUser(id:string){

    let user = await this.getUserById(id);

    if ( !user){

      return {
        status:false,
        msg:"el usuario no  existe en base de datos",
        value:null
      };


    }
  if (  user.userStatus){
    return  {
      status:true,
      msg:"",
      value:{user}
    };
  }

  return {
    status:false,
    msg:"El usuario no ha sido activado",
    value:null
  };

  }

}
