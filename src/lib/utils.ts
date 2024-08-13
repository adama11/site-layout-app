import type { SiteDevices } from '@/app/pages/main';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { deviceData } from '../app/device-data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setNumberOfTransformersNeeded(siteDevices: SiteDevices): [SiteDevices, boolean] {
  const numberOfBatteries = Object.entries(siteDevices).reduce(
    (acc: number, [deviceName, deviceCount]: [string, number]) => {
      if (deviceName === 'Transformer') {
        return acc;
      }
      return acc + deviceCount;
    },
    0,
  );
  const numberOfTransformersNeeded = Math.floor(numberOfBatteries / 2);
  const existingTransformerCount = siteDevices.Transformer || 0;
  // biome-ignore lint/performance/noDelete: false
  delete siteDevices.Transformer;
  if (numberOfTransformersNeeded > 0) {
    siteDevices.Transformer = numberOfTransformersNeeded;
  }
  const didAddTransformer = numberOfTransformersNeeded > existingTransformerCount;
  return [siteDevices, didAddTransformer];
}

export function computeTotalArea(siteDevices: SiteDevices): number {
  const area = Object.entries(siteDevices).reduce((acc: number, [deviceName, deviceCount]: [string, number]) => {
    return acc + deviceData[deviceName].xDimension * deviceData[deviceName].yDimension * deviceCount;
  }, 0);
  return area;
}

export function computeTotalCost(siteDevices: SiteDevices): number {
  const cost = Object.entries(siteDevices).reduce((acc: number, [deviceName, deviceCount]: [string, number]) => {
    return acc + deviceData[deviceName].cost * deviceCount;
  }, 0);
  return cost;
}

export function computeTotalPower(siteDevices: SiteDevices): number {
  const power = Object.entries(siteDevices).reduce((acc: number, [deviceName, deviceCount]: [string, number]) => {
    return acc + deviceData[deviceName].power * deviceCount;
  }, 0);
  return power;
}

export const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
