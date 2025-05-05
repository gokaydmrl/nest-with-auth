import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + `/.env.${process.env.NODE_ENV}` });

const sql = neon(
  'postgresql://neondb-nest_owner:npg_5fGykIgZPp0K@ep-shiny-silence-a4o56dpf-pooler.us-east-1.aws.neon.tech/neondb-nest?sslmode=require',
);
export const client = drizzle(sql);
