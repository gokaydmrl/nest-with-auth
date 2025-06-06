import { Controller, Get, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { AuthGuard } from '../../guard/auth.guard';
import { User } from '../../decorator/user.dercorator';
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
