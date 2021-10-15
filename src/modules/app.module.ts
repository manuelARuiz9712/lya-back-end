import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from '../controllers/authcontroller';
import { AppService } from '../services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { UserController } from 'controllers/user.controller';
import { UserService } from 'services/user.service';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'auth/auth.service'; 
import { LocalStrategy } from 'auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';


@Module({
  imports: [
    ConfigModule.forRoot({
     isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/lyatest'),
    MongooseModule.forFeature([
        
      { name:"users",schema: UserSchema }
    ]
      ),
      PassportModule,
      JwtModule.register({
        secret:process.env.JWT_SECRET,
        signOptions: { expiresIn: '5000s' },
      }),
  ],
  controllers: [AuthController,UserController],
  providers: [AppService,UserService,AuthService,LocalStrategy,JwtAuthGuard],
  exports: [AuthService,JwtAuthGuard],
})
export class AppModule {}
