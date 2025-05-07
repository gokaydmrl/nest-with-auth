import { Injectable, Inject } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from 'drizzle/schema';
@Injectable()
export class CatsService {
  constructor(
    @Inject('DRIZZLE') private readonly db: ReturnType<typeof drizzle>,
  ) {}
  async getCats() {
    const usersData = await this.db.select().from(users);

    return usersData;
  }
}
