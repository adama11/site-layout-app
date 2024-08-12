import { SiteLayout } from "@/lib/layoutUtils";
import { useEffect, useRef } from "react";
import { deviceData } from "../device-data";

const CANVAS_SCALE = 25;
export const SampleLayoutCanvas = ({
  siteLayout,
}: {
  siteLayout: SiteLayout;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx !== null) {
        // set site size
        ctx.canvas.width = siteLayout.estimatedSiteWidth * CANVAS_SCALE;
        ctx.canvas.height = siteLayout.estimatedSiteHeight * CANVAS_SCALE;
        ctx.clearRect(
          0,
          0,
          canvasRef.current.width * CANVAS_SCALE,
          canvasRef.current.height * CANVAS_SCALE
        );
        ctx.fillStyle = "#e1e4ed";
        ctx.rect(
          0,
          0,
          canvasRef.current.width * CANVAS_SCALE,
          canvasRef.current.height * CANVAS_SCALE
        );
        ctx.fill();

        ctx.strokeStyle = "#00000066";
        ctx.lineWidth = 0.5 * CANVAS_SCALE;

        // draw devices on the site
        for (const row of siteLayout.layoutPositions) {
          for (const position of row) {
            const width = deviceData[position.deviceName].xDimension;
            const height = deviceData[position.deviceName].yDimension;
            ctx.fillStyle = "#54a7ff";
            ctx.beginPath();
            ctx.roundRect(
              position.x * CANVAS_SCALE + 0.5 * CANVAS_SCALE,
              position.y * CANVAS_SCALE + 0.5 * CANVAS_SCALE,
              width * CANVAS_SCALE - 1 * CANVAS_SCALE,
              height * CANVAS_SCALE - 1 * CANVAS_SCALE,
              1 * CANVAS_SCALE
            );
            ctx.save();
            ctx.clip();
            ctx.lineWidth *= 2;
            ctx.fill();
            ctx.stroke();
            ctx.restore();

            ctx.fillStyle = "#FFFFFF66";
            ctx.font = `${4 * CANVAS_SCALE}px Arial`;
            ctx.fillText(
              deviceData[position.deviceName].abbreviation,
              position.x * CANVAS_SCALE + 1.8 * CANVAS_SCALE,
              position.y * CANVAS_SCALE + 4.8 * CANVAS_SCALE
            );
          }
        }
      }
    }
  }, [siteLayout]);

  return (
    <div className="h-full">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
};
