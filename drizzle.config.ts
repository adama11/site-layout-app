import { defineConfig } from 'drizzle-kit';

// biome-ignore lint/style/noDefaultExport: we need this file to be a module
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
