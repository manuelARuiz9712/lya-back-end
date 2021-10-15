import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { UserController } from 'controllers/user.controller';
import { UserService } from 'services/user.service';

@Module({
  imports: [ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/lyatest'),
    MongooseModule.forFeature([
        
      { name:"users",schema: UserSchema }
    ]
      )
  ],
  controllers: [AppController,UserController],
  providers: [AppService,UserService],
})
export class AppModule {}
