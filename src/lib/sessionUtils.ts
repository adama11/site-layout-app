import type { SiteDevices } from '@/app/pages/main';
import _ from 'lodash';
import { adjectives, animals, colors, uniqueNamesGenerator } from 'unique-names-generator';

export const getNewSessionName = () => {
  const randomName: string = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '-',
  });
  return randomName;
};

// save session to local storage
export const saveSession = (sessionName: string, siteDevices: SiteDevices) => {
  // compare with previous value, then update if changed
  const previousSessions = JSON.parse(localStorage.getItem('site-layout-app-sessions') || '{}');
  if (!_.isEqual(previousSessions[sessionName], siteDevices)) {
    localStorage.setItem('site-layout-app-sessions', JSON.stringify({ [sessionName]: siteDevices }));
    localStorage.setItem('site-layout-app-last-updated', new Date().getTime().toString());
  }
};

export const getLastUpdateRelativeText = () => {
  const lastUpdated = localStorage.getItem('site-layout-app-last-updated');
  if (lastUpdated) {
    // date from utc seconds
    const lastUpdatedDate = new Date(Number(lastUpdated));
    const now = new Date();
    const diff = now.getTime() - lastUpdatedDate.getTime();
    const diffInSeconds = Math.floor(diff / 1000);
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  } else {
    return '-';
  }
};
