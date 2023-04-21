import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';


@Controller()
export class AppController {
  @ApiExcludeEndpoint()
  @Get()
  @Redirect('api-docs')
  root(): unknown {
    return { url: 'api-docs' };
  }
}
