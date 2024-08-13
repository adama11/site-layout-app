import { drizzle } from 'drizzle-orm/libsql';
import { type Client, createClient } from '@libsql/client';

let client: Client;
if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'local') {
  client = createClient({
    url: 'http://127.0.0.1:8080',
  });
} else {
  client = createClient({
    url: process.env.DATABASE_URL ?? '',
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
}

export const db = drizzle(client);
