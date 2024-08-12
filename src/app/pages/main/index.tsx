"use client";

import { BatteryInfoCard } from "@/app/components/battery-info-card";
import { DeviceSummaryRow } from "@/app/components/device-summary-row";
import { EmptyCard } from "@/app/components/empty-card";
import { Header } from "@/app/components/header";
import { SampleLayoutCanvas } from "@/app/components/sample-layout-canvas";
import { SkeletonCard } from "@/app/components/skeleton-card";
import { deviceData } from "@/app/device-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSiteLayout, SiteLayout } from "@/lib/layoutUtils";
import {
  getLastUpdateRelativeText,
  getNewSessionName,
  getSavedSessions,
  saveSession,
} from "@/lib/sessionUtils";
import {
  setNumberOfTransformersNeeded,
  computeTotalArea,
  computeTotalCost,
  computeTotalPower,
  usdFormatter,
} from "@/lib/utils";
import _ from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";

export type SiteDevices = Record<string, number>;

export function Main() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const loadSessionName = () => {
    return searchParams.get("session") || getNewSessionName();
  };

  const loadSiteDevices = (): SiteDevices => {
    const sessionName = searchParams.get("session");
    if (!sessionName) {
      return {};
    }
    const previousSessions = getSavedSessions();
    return previousSessions[sessionName] || {};
  };

  const addSessionToUrl = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("session", name);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const [siteDevices, setSiteDevices] = useState<SiteDevices | undefined>(
    undefined
  );
  const [sessionName, setSessionName] = useState<string | undefined>(undefined);
  const [lastUpdatedText, setLastUpdatedText] = useState<string>(
    getLastUpdateRelativeText()
  );
  const [siteLayout, setSiteLayout] = useState<SiteLayout | undefined>(
    undefined
  );

  // Load session data to avoid hydration error
  useEffect(() => {
    if (sessionName === undefined) {
      setSessionName(loadSessionName());
    }
  }, [sessionName]);
  useEffect(() => {
    if (siteDevices === undefined) {
      setSiteDevices(loadSiteDevices());
    }
  }, [siteDevices]);
  useEffect(() => {
    if (siteDevices === undefined) return;
    setSiteLayout(getSiteLayout(siteDevices));
  }, [siteDevices]);

  // Save session side effect
  useEffect(() => {
    if (!_.isEmpty(siteDevices) && sessionName !== undefined) {
      saveSession(sessionName, siteDevices);
    }
  }, [addSessionToUrl, sessionName, siteDevices]);
  useEffect(() => {
    if (sessionName !== undefined) {
      addSessionToUrl(sessionName);
    }
  }, [addSessionToUrl, sessionName]);

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

  const handleAddDevice = (deviceName: string) => {
    let newSiteDevices;
    setSiteDevices((prev) => {
      newSiteDevices = { ...prev };
      newSiteDevices[deviceName] = (newSiteDevices[deviceName] || 0) + 1;
      return setNumberOfTransformersNeeded(newSiteDevices);
    });
    if (newSiteDevices !== undefined) {
      setSiteLayout(getSiteLayout(newSiteDevices));
    }
  };
  const handleRemoveDevice = (deviceName: string) => {
    let newSiteDevices;
    setSiteDevices((prev) => {
      newSiteDevices = { ...prev };
      if (newSiteDevices === undefined) return newSiteDevices;
      newSiteDevices[deviceName] = Math.max(0, newSiteDevices[deviceName] - 1);
      if (newSiteDevices[deviceName] === 0) delete newSiteDevices[deviceName];
      return setNumberOfTransformersNeeded(newSiteDevices);
    });
    if (newSiteDevices !== undefined) {
      setSiteLayout(getSiteLayout(newSiteDevices));
    }
  };

  let siteLayoutIsEmpty =
    _.isEmpty(siteLayout) ||
    (siteLayout.layoutPositions.length === 1 &&
      _.isEmpty(siteLayout.layoutPositions[0]));

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-300 pb-10">
      <Header
        sessionName={sessionName}
        lastUpdatedText={lastUpdatedText}
        setSessionName={setSessionName}
        setSiteDevices={setSiteDevices}
        setSiteLayout={setSiteLayout}
        getNewSessionName={getNewSessionName}
      />
      <div className="w-full font-bold text-3xl text-slate-700 text-left pt-5 px-10">
        Devices
      </div>
      <div className="w-full grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 pt-5 px-10">
        {Object.entries(deviceData).map(([deviceName, deviceInfo]) => (
          <BatteryInfoCard
            key={deviceName}
            deviceName={deviceName}
            device={deviceInfo}
            addDevice={handleAddDevice}
          />
        ))}
      </div>
      <div className="w-full pt-10 px-10">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="font-bold text-3xl text-slate-700">
                Site Summary
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {siteDevices === undefined && <SkeletonCard />}
            {siteDevices !== undefined && _.isEmpty(siteDevices) && (
              <EmptyCard />
            )}
            {siteDevices !== undefined && !_.isEmpty(siteDevices) && (
              <div className="w-full grid xs:grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="col-span-1 flex flex-col gap-2">
                  {Object.entries(siteDevices).map(
                    ([deviceName, deviceCount]) => (
                      <DeviceSummaryRow
                        key={deviceName}
                        deviceName={deviceName}
                        deviceCount={deviceCount}
                        addDevice={handleAddDevice}
                        removeDevice={handleRemoveDevice}
                      />
                    )
                  )}
                </div>
                <div className="xs:col-span-1 lg:col-span-2">
                  <div className="flex flex-col">
                    <div className="text-sm uppercase text-slate-400 font-bold">
                      Total Equipment Area
                    </div>
                    <div className="text-2xl mb-4">
                      {computeTotalArea(siteDevices).toFixed(0)} ft²
                    </div>
                    <div className="text-sm uppercase text-slate-400 font-bold">
                      Estimated Total Site Area (see Sample Layout)
                    </div>
                    <div className="text-2xl mb-4">
                      {siteLayout?.estimatedSiteArea.toFixed(0)} ft²
                    </div>
                    <div className="text-sm uppercase text-slate-400 font-bold">
                      Total Power
                    </div>
                    <div className="text-2xl mb-4">
                      {computeTotalPower(siteDevices).toFixed(1)} MWh
                    </div>
                    <div className="text-sm uppercase text-slate-400 font-bold">
                      Total Cost
                    </div>
                    <div className="text-2xl mb-4">
                      {usdFormatter.format(computeTotalCost(siteDevices))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="w-full pt-10 px-10">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <div className="font-bold text-3xl text-slate-700">
                Sample Site Layout
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {siteLayout === undefined && <SkeletonCard />}
            {siteLayout !== undefined && siteLayoutIsEmpty && <EmptyCard />}
            {siteLayout !== undefined && !siteLayoutIsEmpty && (
              <div className="rounded-sm">
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <div className="text-lg mb-3">
                      <br />
                    </div>
                    <div
                      className="grow text-lg uppercase text-slate-400 font-bold text-center border-l-4 mr-2 border-slate-400"
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "sideways",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {siteLayout.estimatedSiteHeight.toFixed(0)} ft
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-col lg:w-1/2">
                      <div className="text-lg uppercase text-slate-400 font-bold text-center border-b-4 mb-2 border-slate-400">
                        {siteLayout.estimatedSiteWidth.toFixed(0)} ft
                      </div>
                      <SampleLayoutCanvas siteLayout={siteLayout} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
