import type { SiteDevices } from '@/app/pages/main';
import { deviceData } from '@/app/device-data';
import _ from 'lodash';

export type SitePosition = {
  x: number;
  y: number;
  deviceName: string;
};

export type SiteLayout = {
  estimatedSiteWidth: number;
  estimatedSiteHeight: number;
  estimatedSiteArea: number;
  layoutPositions: SitePosition[][];
};

const MAX_LAYOUT_WIDTH = 100;

export const getSiteLayout = (siteDevices: SiteDevices): SiteLayout => {
  const devices = { ...siteDevices };
  const positions: SitePosition[][] = [[]];
  let maxWidth = 0;
  let rowIndex = 0;

  let remainingSiteWidth = MAX_LAYOUT_WIDTH;
  let currentWidth = 0;
  while (!_.isEmpty(devices)) {
    let didAdd = false;
    for (const [deviceName, deviceInfo] of Object.entries(deviceData)) {
      if (devices[deviceName] > 0 && remainingSiteWidth >= deviceInfo.xDimension) {
        positions[rowIndex].push({
          deviceName,
          x: currentWidth,
          y: rowIndex * 10,
        });
        devices[deviceName] = Math.max(0, devices[deviceName] - 1);
        if (devices[deviceName] === 0) delete devices[deviceName];
        remainingSiteWidth -= deviceInfo.xDimension;
        currentWidth += deviceInfo.xDimension;
        didAdd = true;
        break;
      }
    }
    maxWidth = Math.max(maxWidth, currentWidth);
    if (!didAdd) {
      rowIndex++; // add a new row
      positions.push([]); // add a new row
      remainingSiteWidth = MAX_LAYOUT_WIDTH; // reset the width
      currentWidth = 0; // reset the width
    }
  }
  const height = (rowIndex + 1) * 10;
  return {
    estimatedSiteWidth: maxWidth,
    estimatedSiteHeight: height,
    estimatedSiteArea: maxWidth * height,
    layoutPositions: positions,
  };
};
