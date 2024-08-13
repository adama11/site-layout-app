'use server';
import type { SiteDevices } from '@/app/pages/main';
import { adjectives, animals, colors, uniqueNamesGenerator } from 'unique-names-generator';
import { db } from '@/db/utils';
import { siteSession } from '@/db/models/siteSession';
import { eq, sql } from 'drizzle-orm';

const getNewSessionName = () => {
  const randomName: string = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '-',
  });
  return randomName;
};

export const createNewSiteSession = async () => {
  while (true) {
    const sessionName = getNewSessionName();
    const session = await db.select().from(siteSession).where(eq(siteSession.name, sessionName)).all();
    if (session.length === 0) {
      const newSession = await db
        .insert(siteSession)
        .values({
          name: sessionName,
          deviceData: JSON.stringify({}),
        })
        .returning()
        .get();
      return newSession;
    }
  }
};

export const getAllSiteSessions = async () => {
  const sessions = await db.select().from(siteSession).all();
  return sessions;
};

export const getSiteSession = async (sessionName: string) => {
  const session = await db.select().from(siteSession).where(eq(siteSession.name, sessionName)).all();
  if (session.length === 0) {
    return null;
  }
  return session[0];
};

export const updateSiteSession = async (sessionName: string, siteDevices: SiteDevices) => {
  const session = await db.select().from(siteSession).where(eq(siteSession.name, sessionName)).all();
  if (session.length === 0) {
    throw new Error('Session not found');
  } else {
    const session = await db
      .update(siteSession)
      .set({
        deviceData: JSON.stringify(siteDevices),
        lastUpdated: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(siteSession.name, sessionName))
      .returning()
      .get();
    return session;
  }
};
