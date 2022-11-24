import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiTags('server')
  @Get()
  status() {
    return 'Server is running';
  }
}
