import {
  Controller,
  Get,
  Req,
  Res,
  Post,
  Body,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { UserSave } from 'src/types/user';
import { IData } from 'src/types/testing';
@Controller('saveUser')
export class SaveUserController {
  constructor(private readonly saveUserService: UserService) {}

  @Get('/get')
  @HttpCode(200)
  getUser(): IData {
    const a = this.saveUserService.getUser();
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
