import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Example')
    .setDescription('API Example - Descrição')
    .setVersion('1.0')
    .addTag('API Example')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api-docs', app, swaggerDocument);
  await app.listen(port);
}
bootstrap();
