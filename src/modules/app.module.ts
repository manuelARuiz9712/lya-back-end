import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';

@Module({
  imports: [ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/lyatest'),
    MongooseModule.forFeature([
        
      { name:"users",schema: UserSchema }
    ]
      )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
