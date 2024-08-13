import { sql } from 'drizzle-orm';
import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const siteSession = sqliteTable('site_session', {
  id: integer('id', { mode: 'number' }).notNull().primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  lastUpdated: text('last_updated').notNull().default(sql`CURRENT_TIMESTAMP`),
  deviceData: text('device_data').notNull().default(''),
});

export type DBSiteSession = typeof siteSession.$inferInsert;
