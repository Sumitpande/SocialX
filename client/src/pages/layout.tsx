import { AppSidebar } from "@/components/navigation/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";
import useListenCall from "@/hooks/useListenCall";
import useConversationStore from "@/store/conversationStore";
import { IncomingCallAlert } from "@/components/calls/IncomingCall";
import { OutgoingCall } from "@/components/calls/OutgoingCall";
import useListenMessages from "@/hooks/useListenMessage";
import BottomNav from "@/components/navigation/BottomNav";
import { useIsMobile } from "@/hooks/use-mobile";
export default function Layout() {
  useListenCall();
  useListenMessages();
  const {
    incomingCall,
    outgoingCall,
    setIncomingCall,
    setOutgoingCall,
    callData,
    outGoingCallData,
  } = useConversationStore();
  const isMobile = useIsMobile();
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {!isMobile && (
            <SidebarTrigger className=" absolute left-0 top-14 z-50" />
          )}
          <div className="p-1 pt-0 main-layout-container">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
      {isMobile && (
        <div>
          <BottomNav />
        </div>
      )}
      <IncomingCallAlert
        open={incomingCall}
        setOpen={setIncomingCall}
        data={callData}
      />
      <OutgoingCall
        open={outgoingCall}
        setOpen={setOutgoingCall}
        data={outGoingCallData}
      />
    </div>
  );
}
