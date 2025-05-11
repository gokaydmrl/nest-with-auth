import {
  Body,
  Controller,
  Get,
  Req,
  Res,
  Sse,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OpenAiService } from './services/openai.service';
import { AuthGuard } from './guard/auth.guard';
import { User } from './decorator/user.dercorator';
import { UserSave } from './types/user';
// import jwt from 'jsonwebtoken';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly openAiService: OpenAiService,
  ) {}

  @Get()
  getHello(@Req() req: Request, @Res() res: Response): any {
    res
      .status(200)
      .send({ success: true, message: 'Hello World - github/gokaydmrl' });
    // return this.appService.getHello();
  }
  @Sse('/sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map(() => ({ data: { hello: 'world' } }) as MessageEvent),
    );
  }

  @Sse('/getWelcome')
  getWelcome(@Req() req: Request): Observable<MessageEvent> {
    const username =
      typeof req.headers.username === 'string' && req.headers.username
        ? req.headers.username
        : 'ali';

    console.log(req.headers.username);
    return this.openAiService.getVoiceStream(username);
  }
}
