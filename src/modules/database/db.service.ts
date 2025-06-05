import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

dotenv.config();

@Injectable()
export class DatabaseService {
  private sql = neon(process.env.DATABASE_URL!);
  public client = drizzle(this.sql);
}
