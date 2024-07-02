import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(): string {
    return 'Welcome to the API';
  }

  getHello(): string {
    return 'Hello World!';
  }
}
