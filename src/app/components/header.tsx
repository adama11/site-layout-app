import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { TbChevronDown, TbLoader2, TbRefresh } from "react-icons/tb";
import Image from "next/image";
import type { SiteDevices } from "../pages/main";
import { set } from "lodash";
import { SiteLayout } from "@/lib/layoutUtils";

export const Header = ({
  sessionName,
  lastUpdatedText,
  setSessionName,
  setSiteDevices,
  setSiteLayout,
  getNewSessionName,
}: {
  sessionName: string | undefined;
  lastUpdatedText: string;
  setSessionName: (name: string) => void;
  setSiteDevices: (devices: SiteDevices) => void;
  setSiteLayout: (layout: SiteLayout | undefined) => void;
  getNewSessionName: () => string;
}) => {
  return (
    <header className="bg-slate-900 flex w-full flex-wrap items-center justify-between px-3 shadow-md">
      <div className="flex grow basis-0 justify-start">
        <Image
          className={"m-4 cursor-pointer object-contain max-h-[40px]"}
          src="/logo.png"
          height={0}
          width={40}
          alt={"logo"}
        />
      </div>
      <div className="flex grow basis-0 justify-center space-x-4">
        <div className="font-bold text-3xl text-white">Site Planner</div>
      </div>
      <div className="flex grow basis-0 justify-end space-x-4">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <div className="mr-2">
                {sessionName ? (
                  sessionName
                ) : (
                  <TbLoader2 className="animate-spin" />
                )}
              </div>
              <TbChevronDown />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem
                onClick={() => {
                  setSessionName(getNewSessionName());
                  setSiteDevices({});
                  setSiteLayout(undefined);
                }}
              >
                <TbRefresh className="mr-2 cursor-pointer" /> New Session
              </MenubarItem>
              <MenubarSeparator />
              <div className="px-2 pt-2 text-xs font-bold uppercase text-slate-400">
                Last saved (auto)
              </div>
              <div className="px-2 pb-2 text-sm">{lastUpdatedText}</div>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  );
};
