import { UserCard } from "@/components/feed/user-card";
import { FeedContainer } from "@/components/post/FeedContainer";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

// import { useState } from "react";

export default function Home() {
  return (
    <ScrollArea className="h-[calc(100vh-64px)]">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] w-full"
      >
        <ResizablePanel defaultSize={60} minSize={50}>
          <FeedContainer />
        </ResizablePanel>
        <ResizableHandle className="" withHandle />
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className=" p-1">
            <UserCard />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ScrollArea>
  );
}
