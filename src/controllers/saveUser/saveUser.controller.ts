import {
  Controller,
  Get,
  Req,
  Res,
  Post,
  Body,
  HttpCode,
} from '@nestjs/common';
import { SaveUserService } from '../saveUser/saveUser.service';
import { Request, Response } from 'express';
import { UserSave } from 'src/types/user';
import { TRes, IData } from 'src/types/testing';
@Controller('saveUser')
export class SaveUserController {
  constructor(private readonly saveUserService: SaveUserService) {}

  @Get('/get')
  @HttpCode(200)
  getUser(): IData {
    return {
      success: true,
      data: 'hellow orld',
    };
  }

  @Post(`/save`)
  async postUser(
    @Req() req: Request,
    @Res() res: Response,
    @Body()
    body: UserSave,
  ): Promise<any> {
    console.log('body.userId', body.sub);
    const response = await this.saveUserService.saveUser(body);
    if (!response) {
      return res.status(200).send({
        success: true,
        message: 'user already exists',
      });
    } else {
      return res.status(201).send({
        success: true,
        message: 'user created',
        user: response,
      });
    }
  }
}
