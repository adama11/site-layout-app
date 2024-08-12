import { Button } from '@/components/ui/button';

export const DeviceSummaryRow = ({
  deviceName,
  deviceCount,
  addDevice,
  removeDevice,
}: {
  deviceName: string;
  deviceCount: number;
  addDevice: (deviceName: string) => void;
  removeDevice: (deviceName: string) => void;
}) => {
  return (
    <div className="flex justify-between gap-4 border border-slate-400 rounded-md p-2 m-2">
      <div className="flex flex-col gap-2">
        <div className="text-xs uppercase text-slate-400 font-bold">{deviceName}</div>
      </div>
      {deviceName !== 'Transformer' ? (
        <div className="flex gap-2 items-center">
          <Button variant={'secondary'} onClick={() => removeDevice(deviceName)}>
            -
          </Button>
          <div className="text-lg font-bold w-8 text-center">{deviceCount}</div>
          <Button variant={'secondary'} onClick={() => addDevice(deviceName)}>
            +
          </Button>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <div className="text-lg font-bold w-8 text-right">{deviceCount}</div>
        </div>
      )}
    </div>
  );
};
