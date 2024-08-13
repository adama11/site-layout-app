'use server';
import { createNewSiteSession, getSiteSession, updateSiteSession } from '@/lib/dbSessionUtils';
import type { SiteDevices } from '.';
import type { DbSiteSession } from '@/db/models/siteSession';

export const getOrCreateSession = async (sessionName: string | null) => {
  let session: DbSiteSession | null = null;
  if (sessionName) {
    session = await getSiteSession(sessionName);
  }
  if (!session) {
    session = await createNewSiteSession();
  }
  return session;
};

export const saveSession = async (sessionName: string, siteDevices: SiteDevices) => {
  return await updateSiteSession(sessionName, siteDevices);
};
