import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Request } from 'express';
import { AuthGuard } from 'src/decorators/user.decorator';

@Controller('cats')
@UseGuards(AuthGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCats(@Req() req: Request): string {
    console.log('this.catsService.getCats()', req.user.sub);

    return this.catsService.getCats();
  }
}
