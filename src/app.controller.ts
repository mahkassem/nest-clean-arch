import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): any {
    return fs.readFileSync(
      this.appService.getHello(),
      'utf8'
    ).replace(/<version>/g, 'v1');
  }
}
