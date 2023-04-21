import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';


@Module({})
export class UserModule {
  static forRoot() {
    return {
      module: UserModule,
      imports: [
        ConfigModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [
        UserService,
      ],
      exports: [UserService],
      controllers: [UserController],
      declare: [ConfigService]
    };
  }
}