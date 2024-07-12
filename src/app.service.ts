import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '2';
  }
  getProfile(): string {
    return 'It is my profile';
  }
}
