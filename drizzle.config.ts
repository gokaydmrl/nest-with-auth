import { defineConfig } from 'drizzle-kit';
import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + `/.env.${process.env.NODE_ENV}` });

export default defineConfig({
  dialect: 'postgresql',
  schema: './drizzle/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: 'postgresql://neondb-nest_owner:npg_5fGykIgZPp0K@ep-shiny-silence-a4o56dpf-pooler.us-east-1.aws.neon.tech/neondb-nest?sslmode=require',
  },
}) satisfies Config;
