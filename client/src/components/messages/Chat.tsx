import ChatTopbar from "./ChatTopbar";
import { ChatContainer } from "./ChatContainer";
import chatLogo from "@/assets/chat.svg";

import useConversationStore from "@/store/conversationStore";

interface ChatProps {
  isMobile: boolean;
}

export function Chat({ isMobile }: ChatProps) {
  const { selectedConversation } = useConversationStore();
  return (
    <>
      {selectedConversation._id ? (
        <div className="flex flex-col justify-between w-full h-full">
          <ChatTopbar selectedConversation={selectedConversation} />

          <ChatContainer isMobile={isMobile} />
        </div>
      ) : (
        <div className="flex flex-col gap-2 justify-center h-full">
          <img src={chatLogo} className="max-w-sm mx-auto" alt="Start Chat" />
          <div className="mx-auto">
            Select a conversation or start a
            <a className="font-bold"> new one</a>
          </div>
        </div>
      )}
    </>
  );
}
