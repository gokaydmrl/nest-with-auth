import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Request } from 'express';
import { AuthGuard } from 'src/decorators/user.decorator';
import { client } from 'src/db';
import { users } from '../../drizzle/schema';

@Controller('cats')
// @UseGuards(AuthGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getCats(@Req() req: Request): Promise<any> {
    // console.log('this.catsService.getCats()', req.user.sub);
    const usersAll = await client.select().from(users);
    console.log(usersAll);

    return { data: this.catsService.getCats(), dataTwo: usersAll };
  }
}
