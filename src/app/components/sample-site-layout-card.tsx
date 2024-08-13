import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EmptyCard } from "./empty-card";
import { SampleLayoutCanvas } from "./sample-layout-canvas";
import { SkeletonCard } from "./skeleton-card";
import type { SiteLayout } from "@/lib/layoutUtils";
import _ from "lodash";

export const SampleSiteLayout = ({
  siteLayout,
}: {
  siteLayout: SiteLayout | undefined;
}) => {
  const siteLayoutIsEmpty =
    _.isEmpty(siteLayout) ||
    (siteLayout.layoutPositions.length === 1 &&
      _.isEmpty(siteLayout.layoutPositions[0]));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="font-bold text-3xl text-slate-700">
            Sample Site Layout
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-stretch justify-center min-h-80">
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
  );
};
