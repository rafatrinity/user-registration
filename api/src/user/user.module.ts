import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { User, UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({})
export class UserModule {
  static forRoot() {
    return {
      module: UserModule,
      imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [
        UserService,
        { provide: 'UserModel', useValue: User },
      ],
      exports: [UserService],
      controllers: [UserController],
    };
  }
}