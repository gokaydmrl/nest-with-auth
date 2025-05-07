import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import { decode } from 'jsonwebtoken';
// import { decode } from 'jsonwebtoken';
// import { client } from '../db/index';
// import { users } from '../../drizzle/schema';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request Middleware...');

    next();
  }
}
