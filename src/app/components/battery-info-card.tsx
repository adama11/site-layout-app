import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TbBolt, TbInfoCircle } from 'react-icons/tb';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import Image from 'next/image';
import { usdFormatter } from '@/lib/utils';
import type { DeviceInfo } from '../device-data';

export const BatteryInfoCard = ({
  deviceName,
  device,
  addDevice,
}: {
  deviceName: string;
  device: DeviceInfo;
  addDevice: (deviceName: string) => void;
}) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{deviceName}</CardTitle>
        <CardDescription>{device.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-start align-items-top gap-4">
        <div>
          <Image className="rounded-md" src={`/${device.image}`} alt="device-image" width={120} height={100} />
        </div>
        <div className="flex flex-col">
          <div className="text-xs uppercase text-slate-400 font-bold">Dimensions</div>
          <div className="text-lg mb-2">
            {device.xDimension}x{device.yDimension} ft
          </div>
          <div className="text-xs uppercase text-slate-400 font-bold">Power</div>
          <div className="text-lg">{device.power} MWh</div>
          <div className="flex mb-2">
            {Array(device.powerLevel)
              .fill(0)
              .map((_, i) => (
                <TbBolt key={i} color={device.powerColor} />
              ))}
          </div>
          <div className="text-xs uppercase text-slate-400 font-bold">Cost</div>
          <div className="text-lg mb-2">{usdFormatter.format(device.cost)}</div>
          <div className="text-xs uppercase text-slate-400 font-bold">Release Date</div>
          <div className="text-lg mb-2">{device.releaseDate}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        {device.type === 'battery' ? (
          <Button variant="secondary" onClick={() => addDevice(deviceName)}>
            Add to Site
          </Button>
        ) : (
          <>
            <Button variant="outline" disabled={true}>
              Added Automatically
            </Button>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <TbInfoCircle className="ml-2 text-slate-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Transformers are automatically added to your site.
                    <br />
                    For every 2 industrial batteries added, 1 transformer is added to your site.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
