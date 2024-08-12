import type { SiteDevices } from '@/app/pages/main';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function computeNumberOfTransformersNeeded(siteDevices: SiteDevices): number {
  const numberOfBatteries = Object.entries(siteDevices).reduce(
    (acc: number, [deviceName, deviceCount]: [string, number]) => {
      if (deviceName === 'Transformer') {
        return acc;
      }
      return acc + deviceCount;
    },
    0,
  );
  return Math.floor(numberOfBatteries / 2);
}
