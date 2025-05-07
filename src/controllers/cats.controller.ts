import { Controller, Get, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Request } from 'express';
import { AuthGuard } from 'src/guard/auth.guard';
// import { client } from 'src/db';
// import { users } from '../../drizzle/schema';
import { User } from 'src/decorator/user.dercorator';
//import { UserSave } from 'src/types/user';
@Controller('cats')
@UseGuards(AuthGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getCats(@User() user: User): Promise<any> {
    console.log('user get Catss', user);

    return { dataqweqwe: await this.catsService.getCats() };
  }
}
