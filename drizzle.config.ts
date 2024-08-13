import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/models',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
  verbose: true,
  strict: true,
  out: './src/db/drizzle',
  dialect: 'sqlite',
});
