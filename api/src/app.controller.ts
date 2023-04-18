import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get()
  @Redirect('api-docs')
  root() {
    return { url: 'api-docs' };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
