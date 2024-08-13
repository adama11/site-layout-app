'use server';

import type { DBSiteSession } from '@/db/models/siteSession';
import { createNewSiteSession, getSiteSession, updateSiteSession } from '@/lib/dbSessionUtils';
import type { SiteDevices } from '.';

export const getOrCreateSession = async (sessionName: string | null) => {
  let session: DBSiteSession | null = null;
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
