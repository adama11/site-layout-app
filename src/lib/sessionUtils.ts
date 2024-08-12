import type { SiteDevices } from "@/app/pages/main";
import _ from "lodash";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";

export const LOCAL_STORAGE_KEY_SESSIONS = "site-layout-app-sessions";
const LOCAL_STORAGE_KEY_LAST_UPDATED = "site-layout-app-last-updated";

export const getNewSessionName = () => {
  const randomName: string = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "-",
  });
  return randomName;
};

export const getSavedSessions = () => {
  if (typeof window === "undefined") {
    return {};
  }
  const previousSessions = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY_SESSIONS) || "{}"
  );
  return previousSessions;
};

// save session to local storage
export const saveSession = (sessionName: string, siteDevices: SiteDevices) => {
  // compare with previous value, then update if changed
  if (typeof window === "undefined") {
    return;
  }
  const previousSessions = getSavedSessions();
  if (!_.isEqual(previousSessions[sessionName], siteDevices)) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_SESSIONS,
      JSON.stringify({ [sessionName]: siteDevices })
    );
    localStorage.setItem(
      LOCAL_STORAGE_KEY_LAST_UPDATED,
      new Date().getTime().toString()
    );
  }
};

const getSavedLastUpdated = () => {
  if (typeof window === "undefined") {
    return;
  }
  return localStorage.getItem(LOCAL_STORAGE_KEY_LAST_UPDATED);
};

export const getLastUpdateRelativeText = () => {
  const lastUpdated = getSavedLastUpdated();
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
    return "-";
  }
};
