import { userInterface } from 'interfaces/user.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User  implements userInterface {
    
    @Prop({required:false})
    userName?: string;

    @Prop()
    userDocument: string;

    @Prop()
    userPassword: string;

    @Prop({
        default:false
    })
    userStatus:boolean

}

export const UserSchema = SchemaFactory.createForClass(User);