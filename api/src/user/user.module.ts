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
        {
          provide: 'DATABASE_CONNECTION',
          useFactory: async () => {
            const { connect } = await import('mongoose');
            return await connect(String(options.uri), {
              user: options.user,
              pass: options.pass,
            });
          },
        },
      ],
      exports: [UserService],
      controllers: [UserController],
    };
  }
}
