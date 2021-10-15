import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'dto/user.dto';
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
}
