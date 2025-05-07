import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request, @Res() res: Response): any {
    res
      .status(200)
      .send({ success: true, message: 'Hello World - github/gokaydmrl' });
    // return this.appService.getHello();
  }
}
