import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/messages/SideBar";
import { Chat } from "@/components/messages/Chat";

// import { useAuthContext } from "@/context/AuthContext";
import useConversationStore from "@/store/conversationStore";
import { IConversation } from "@/types";
// import { IncomingCallAlert } from "@/components/calls/IncomingCall";
// import { OutgoingCall } from "@/components/calls/OutgoingCall";
// import useListenMessages from "@/Hooks/useListenMessage";

export default function Messages() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  // useListenMessages();
  const {
    setSelectedConversation,
    // incomingCall,
    // outgoingCall,
    // setIncomingCall,
    // setOutgoingCall,
    // callData,
    // outGoingCallData,
  } = useConversationStore();
  // const { authUser } = useAuthContext();
  const navCollapsedSize = 8;
  const defaultLayout = [35, 65];

  // const getSelectedUser = () => {
  //   return selectedConversation?.participants?.find(
  //     (u) => u._id != authUser._id,
  //   );
  // };

  useEffect(() => {
    setSelectedConversation({} as IConversation);
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={isMobile ? 0 : 30}
          maxSize={isMobile ? 8 : 35}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
          )}
        >
          <Sidebar isCollapsed={isCollapsed || isMobile} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Chat isMobile={isMobile} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
