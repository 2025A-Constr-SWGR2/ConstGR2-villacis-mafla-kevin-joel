import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index') // Renderiza views/index.ejs
  home() {
    return {};
  }
}
