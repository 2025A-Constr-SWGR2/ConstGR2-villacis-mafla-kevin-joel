import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config'; // Import ConfigService to access environment variables

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService, // Import ConfigService to access environment variables

  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
  @Get('database')
  getDatabaseConnection() {
    return {
      DB_HOST: this.configService.get('DB_HOST'),
      DB_USER: this.configService.get('DB_USER'),
      DB_PASSWORD: this.configService.get('DB_PASSWORD'),
      DB_NAME: this.configService.get('DB_NAME'),
    };
  }
}


