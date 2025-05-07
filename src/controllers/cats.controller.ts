import { Controller, Get, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Request } from 'express';
import { AuthGuard } from 'src/guard/auth.guard';
import { client } from 'src/db';
import { users } from '../../drizzle/schema';
import { User } from 'src/decorator/user.dercorator';
@Controller('cats')
@UseGuards(AuthGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getCats(@User() user: any): Promise<any> {
    const usersAll = await client.select().from(users);

    console.log('user get Catss', user);

    return { data: this.catsService.getCats(), dataTwo: usersAll };
  }
}
