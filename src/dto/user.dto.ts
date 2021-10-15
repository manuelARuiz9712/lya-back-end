import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { userInterface } from 'interfaces/user.interface';


class CreateUserDto  implements userInterface{
   
    
    userName?: string;
    @IsString() @IsNotEmpty()
    userDocument: string;
    @IsString() @IsNotEmpty()
    userPassword: string;
    @IsEmpty()
    userStatus?: boolean;



}

class UpdateUserInfo  implements userInterface{
   
    
    userName?: string;
    userDocument?: string;

}
class LoginUserDto  implements userInterface{
   
    
    @IsNotEmpty()
    userDocument: string;

    @IsNotEmpty()
    userPassword: string;

}



export {
    CreateUserDto,
    UpdateUserInfo,
    LoginUserDto
}