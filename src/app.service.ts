import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    // get index.html from public folder
    return join(__dirname, '..', 'public', 'index.html');
  }
}
