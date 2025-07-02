import Activity from "@/components/feed/Activity";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Outlet } from "react-router-dom";

// import { useState } from "react";

export default function Home() {
  return (
    <div className="h-full flex flex-row ">
      <ScrollArea className="h-[calc(100vh)] w-full grow">
        <Outlet />
      </ScrollArea>
      <Separator className="mx-1 h-full" orientation="vertical" />
      <div className="hidden lg:block h-full ">
        <Activity />
      </div>
    </div>
  );
}
