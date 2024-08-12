'use client';

import { BatteryInfoCard } from '@/app/components/battery-info-card';
import { DeviceSummaryRow } from '@/app/components/device-summary-row';
import { Header } from '@/app/components/header';
import { deviceData } from '@/app/device-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLastUpdateRelativeText, getNewSessionName, saveSession } from '@/lib/sessionUtils';
import { computeNumberOfTransformersNeeded } from '@/lib/utils';
import _ from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useRef } from 'react';

export type SiteDevices = Record<string, number>;

export function Main() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const loadSessionName = () => {
    return searchParams.get('session') || getNewSessionName();
  };

  const loadSiteDevices = () => {
    const sessionName = searchParams.get('session');
    if (!sessionName) {
      return {};
    }
    const previousSessions = JSON.parse(localStorage.getItem('site-layout-app-sessions') || '{}');
    return previousSessions[sessionName] || {};
  };

  const addSessionToUrl = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('session', name);
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const [siteDevices, setSiteDevices] = useState<SiteDevices>(loadSiteDevices());
  const [sessionName, setSessionName] = useState<string>(loadSessionName());
  const [lastUpdatedText, setLastUpdatedText] = useState<string>(getLastUpdateRelativeText());

  // update last updated text every 5 seconds
  const useInterval = (callback: () => void, delay: number) => {
    const savedCallback = useRef(callback);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => savedCallback.current();
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(() => {
    setLastUpdatedText(getLastUpdateRelativeText());
  }, 5000);

  useEffect(() => {
    addSessionToUrl(sessionName);
  }, [addSessionToUrl, sessionName]);

  const handleAddDevice = (deviceName: string) => {
    setSiteDevices((prev) => {
      const newSiteDevices = { ...prev };
      newSiteDevices[deviceName] = (newSiteDevices[deviceName] || 0) + 1;

      const numberOfTransformersNeeded = computeNumberOfTransformersNeeded(newSiteDevices);
      // biome-ignore lint/performance/noDelete: false
      delete newSiteDevices.Transformer;
      if (numberOfTransformersNeeded > 0) {
        newSiteDevices.Transformer = numberOfTransformersNeeded;
      }
      return newSiteDevices;
    });
  };
  const handleRemoveDevice = (deviceName: string) => {
    setSiteDevices((prev) => {
      const newCount = Math.max(0, prev[deviceName] - 1);
      prev[deviceName] = newCount;
      if (newCount === 0) {
        delete prev[deviceName];
      }
      return { ...prev };
    });
  };

  useEffect(() => {
    if (!_.isEmpty(siteDevices)) {
      saveSession(sessionName, siteDevices);
    }
  }, [sessionName, siteDevices]);

  return (
    <div className="h-full flex flex-col items-center bg-slate-300">
      <Header
        sessionName={sessionName}
        lastUpdatedText={lastUpdatedText}
        setSessionName={setSessionName}
        setSiteDevices={setSiteDevices}
        getNewSessionName={getNewSessionName}
      />
      <div className="w-full grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-10 ">
        {deviceData.map((device) => (
          <BatteryInfoCard key={device.name} device={device} addDevice={handleAddDevice} />
        ))}
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <div className="font-bold text-3xl text-slate-700">Site Summary</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(siteDevices).map(([deviceName, deviceCount]) => (
            <DeviceSummaryRow
              key={deviceName}
              deviceName={deviceName}
              deviceCount={deviceCount}
              addDevice={handleAddDevice}
              removeDevice={handleRemoveDevice}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
