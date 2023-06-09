import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { envSchema } from './validators/env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get<string>('DB_URI')}${configService.get<string>('DB_NAME')}`,
      }),
      inject: [ConfigService],
    }),
    UserModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule {}
