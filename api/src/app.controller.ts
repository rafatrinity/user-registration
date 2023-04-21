import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor() {}

  @ApiExcludeEndpoint()
  @Get()
  @Redirect('api-docs')
  root() {
    return { url: 'api-docs' };
  }
}
