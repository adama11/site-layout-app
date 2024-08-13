"use client";
import { BatteryInfoCard } from "@/app/components/battery-info-card";
import { Header } from "@/app/components/header";
import { deviceData } from "@/app/device-data";
import {} from "@/components/ui/card";
import { getSiteLayout, type SiteLayout } from "@/lib/layoutUtils";
import { setNumberOfTransformersNeeded } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { TbInfoCircle } from "react-icons/tb";
import { getOrCreateSession, saveSession } from "./actions";
import { SampleSiteLayout } from "@/app/components/sample-site-layout-card";
import { SiteSummaryCard } from "@/app/components/site-summary-card";

export type SiteDevices = Record<string, number>;

export function Main() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const toast = useToast();

  const [siteDevices, setSiteDevices] = useState<SiteDevices | undefined>(
    undefined
  );
  const [sessionName, setSessionName] = useState<string | undefined>(undefined);
  const [lastUpdated, setLastUpdated] = useState<Date | undefined>(undefined);
  const [siteLayout, setSiteLayout] = useState<SiteLayout | undefined>(
    undefined
  );

  const addSessionToUrl = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("session", name);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: ignore
  const loadSession = useCallback(async () => {
    const sessionFromUrl = searchParams.get("session");
    if (sessionFromUrl === sessionName) {
      return;
    }
    const session = await getOrCreateSession(sessionFromUrl);
    setSessionName(session.name);
    const siteDevices = JSON.parse(session.deviceData || "{}");
    setSiteDevices(siteDevices);
    setSiteLayout(getSiteLayout(siteDevices));
    addSessionToUrl(session.name);
    setLastUpdated(new Date(Date.parse(`${session.lastUpdated} UTC`)));
  }, [addSessionToUrl, searchParams]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const newTransformerAddedToast = () =>
    toast.toast({
      description: (
        <span className="flex items-center font-semibold">
          <TbInfoCircle className="mr-2 text-slate-400 text-xl" />A transformer
          was added to your site to meet your power demands.
        </span>
      ),
    });

  const handleAddDevice = (deviceName: string) => {
    let newSiteDevices: SiteDevices | undefined;
    setSiteDevices((prev) => {
      newSiteDevices = { ...prev };
      newSiteDevices[deviceName] = (newSiteDevices[deviceName] || 0) + 1;
      const [devices, didAdd] = setNumberOfTransformersNeeded(newSiteDevices);
      if (didAdd) {
        newTransformerAddedToast();
      }
      return devices;
    });
    if (newSiteDevices !== undefined) {
      setSiteLayout(getSiteLayout(newSiteDevices));
    }
  };
  const handleRemoveDevice = (deviceName: string) => {
    let newSiteDevices: SiteDevices | undefined;
    setSiteDevices((prev) => {
      newSiteDevices = { ...prev };
      if (newSiteDevices === undefined) {
        return newSiteDevices;
      }
      newSiteDevices[deviceName] = Math.max(0, newSiteDevices[deviceName] - 1);
      if (newSiteDevices[deviceName] === 0) {
        delete newSiteDevices[deviceName];
      }
      const [devices, _] = setNumberOfTransformersNeeded(newSiteDevices);
      return devices;
    });
    if (newSiteDevices !== undefined) {
      setSiteLayout(getSiteLayout(newSiteDevices));
    }
  };

  const save = async (
    sessionName: string | undefined,
    siteDevices: SiteDevices | undefined
  ) => {
    if (sessionName !== undefined && siteDevices !== undefined) {
      const session = await saveSession(sessionName, siteDevices);
      toast.toast({
        title: "Session saved!",
        description: "Keep your session link handy to access it later.",
      });
      if (session) {
        setLastUpdated(new Date(Date.parse(`${session.lastUpdated} UTC`)));
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-300 pb-10">
      <Header
        sessionName={sessionName}
        lastUpdated={lastUpdated}
        resetSession={() => router.push("/")}
        saveSession={() => save(sessionName, siteDevices)}
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
        <SiteSummaryCard
          siteDevices={siteDevices}
          siteLayout={siteLayout}
          handleAddDevice={handleAddDevice}
          handleRemoveDevice={handleRemoveDevice}
        />
      </div>
      <div className="w-full pt-10 px-10">
        <SampleSiteLayout siteLayout={siteLayout} />
      </div>
    </div>
  );
}
