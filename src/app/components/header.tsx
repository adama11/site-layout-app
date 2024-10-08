import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  TbChevronDown,
  TbCloudUpload,
  TbLoader2,
  TbRefresh,
} from "react-icons/tb";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Header = ({
  sessionName,
  lastUpdated,
  resetSession,
  saveSession,
}: {
  sessionName: string | undefined;
  lastUpdated: Date | undefined;
  resetSession: () => void;
  saveSession: () => void;
}) => {
  const lastUpdateText = lastUpdated
    ? lastUpdated.toLocaleString()
    : "Not saved";
  return (
    <header className="bg-slate-900 flex flex-col md:flex-row w-full flex-wrap items-center justify-between px-3 shadow-md">
      <div className="flex grow basis-0 justify-start items-center">
        <Image
          className={"m-4 cursor-pointer object-contain max-h-[40px]"}
          src="/logo.png"
          height={0}
          width={40}
          alt={"logo"}
        />
        <div className="font-bold text-3xl text-white">Site Planner</div>
      </div>
      <div className="flex grow basis-0 justify-end space-x-4 my-2">
        <Button variant={"secondary"} onClick={saveSession}>
          <TbCloudUpload className="mr-2 text-xl" /> Save Session
        </Button>
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
              <MenubarItem onClick={() => resetSession()}>
                <TbRefresh className="mr-2 cursor-pointer" /> New Session
              </MenubarItem>
              <MenubarSeparator />
              <div className="px-2 pt-2 text-xs font-bold uppercase text-slate-400">
                Last saved
              </div>
              <div className="px-2 pb-2 text-sm">{lastUpdateText}</div>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  );
};
