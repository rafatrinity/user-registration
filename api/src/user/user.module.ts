import { Module, DynamicModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConnectOptions } from 'mongoose';

@Module({})
export class UserModule {
  static forRoot(options: ConnectOptions): DynamicModule {
    return {
      module: UserModule,
      providers: [
        UserService,
      ],
      exports: [UserService],
      controllers: [UserController],
    };
  }
}
