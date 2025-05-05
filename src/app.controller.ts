import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request, @Res() res: Response): any {
    // const client = jwksClient({
    //   jwksUri: 'https://dev-uaefh4jccukgswpy.auth0.com/.well-known/jwks.json',
    //   cache: true,
    //   rateLimit: true,
    //   jwksRequestsPerMinute: 5,
    //   timeout: 30000,
    // });
    // function getKey(header, callback) {
    //   client.getSigningKey(header.kid, (err, key) => {
    //     const signingKey = key.getPublicKey();
    //     callback(null, signingKey);
    //   });
    // }

    // req.user = { id: 1, name: 'John Doe' }; // Mock user data
    // console.log('asd', req.user);
    // console.log('params', req.params.userId);
    // console.log('userId', userId);

    res
      .status(200)
      .send({ success: true, message: 'User found', user: req.user });
    // return this.appService.getHello();
  }
}
