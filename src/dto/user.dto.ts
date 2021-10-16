import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { userInterface } from 'interfaces/user.interface';


class CreateUserDto  implements userInterface{
   
    @ApiProperty({
        required:false
    })
    userName?: string;
    
    @ApiProperty()
    @IsString() @IsNotEmpty()
    userDocument: string;

    @ApiProperty()
    @IsString() @IsNotEmpty()
    userPassword: string;
    @IsEmpty()

    
    userStatus?: boolean;



}

class UpdateUserInfo  implements userInterface{
   
    @ApiProperty({
        required:false
    })
    userName?: string;
    @ApiProperty({
        required:false
    })
    userDocument?: string;

}
class LoginUserDto  implements userInterface{
   
    
    @ApiProperty()
    @IsNotEmpty()
    userDocument: string;

    @ApiProperty()
    @IsNotEmpty()
    userPassword: string;

}



export {
    CreateUserDto,
    UpdateUserInfo,
    LoginUserDto
}