import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { SiteDevices } from "../pages/main";
import type { SiteLayout } from "@/lib/layoutUtils";
import { SkeletonCard } from "./skeleton-card";
import { EmptyCard } from "./empty-card";
import _ from "lodash";
import { DeviceSummaryRow } from "./device-summary-row";
import {
  computeTotalArea,
  computeTotalPower,
  usdFormatter,
  computeTotalCost,
} from "@/lib/utils";

export const SiteSummaryCard = ({
  siteDevices,
  siteLayout,
  handleAddDevice,
  handleRemoveDevice,
}: {
  siteDevices: SiteDevices | undefined;
  siteLayout: SiteLayout | undefined;
  handleAddDevice: (deviceName: string) => void;
  handleRemoveDevice: (deviceName: string) => void;
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="font-bold text-3xl text-slate-700">Site Summary</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {siteDevices === undefined && <SkeletonCard />}
        {siteDevices !== undefined && _.isEmpty(siteDevices) && <EmptyCard />}
        {siteDevices !== undefined && !_.isEmpty(siteDevices) && (
          <div className="w-full grid xs:grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="col-span-1 flex flex-col gap-2">
              {Object.entries(siteDevices).map(([deviceName, deviceCount]) => (
                <DeviceSummaryRow
                  key={deviceName}
                  deviceName={deviceName}
                  deviceCount={deviceCount}
                  addDevice={handleAddDevice}
                  removeDevice={handleRemoveDevice}
                />
              ))}
            </div>
            <div className="xs:col-span-1 lg:col-span-2">
              <div className="flex flex-col">
                <div className="text-sm uppercase text-slate-400 font-bold">
                  Total Equipment Area
                </div>
                <div className="text-3xl mb-4">
                  {computeTotalArea(siteDevices).toFixed(0)} ft²
                </div>
                <div className="text-sm uppercase text-slate-400 font-bold">
                  Estimated Total Site Area (see Sample Layout)
                </div>
                <div className="text-3xl mb-4">
                  {siteLayout?.estimatedSiteArea.toFixed(0)} ft²
                </div>
                <div className="text-sm uppercase text-slate-400 font-bold">
                  Total Power
                </div>
                <div className="text-3xl mb-4">
                  {computeTotalPower(siteDevices).toFixed(1)} MWh
                </div>
                <div className="text-sm uppercase text-slate-400 font-bold">
                  Total Cost
                </div>
                <div className="text-3xl mb-4">
                  {usdFormatter.format(computeTotalCost(siteDevices))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
