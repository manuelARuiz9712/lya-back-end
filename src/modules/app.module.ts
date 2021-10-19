
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from '../controllers/auth.controller';
import { AppService } from '../services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { UserController } from 'controllers/user.controller';
import { UserService } from 'services/user.service';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'auth/auth.service'; 
import { LocalStrategy } from 'auth/local.strategy'; 
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'auth/jwt.strategy';
import { JWT_SECRET } from 'utils/contants';
import { HttpModule } from '@nestjs/axios';
import { MessagesController } from 'controllers/messages.controller';
import { MessagesService } from 'services/messages.service';



@Module({
  imports: [
   
    ConfigModule.forRoot({
     isGlobal: true,
    }),
    HttpModule,
    MongooseModule.forRoot(process.env.MONGO_DB),
    MongooseModule.forFeature([
        
      { name:"users",schema: UserSchema }
    ]
      ),
   
      PassportModule,
      JwtModule.register({
        secret: JWT_SECRET,
        signOptions: { expiresIn: '60s' },
      }),

  ],
  controllers: [AuthController,UserController,MessagesController],
  providers: [AuthService,LocalStrategy,JwtStrategy,AppService,UserService,MessagesService],
  exports: [AuthService],
})
export class AppModule {}
