import ChatTopbar from "./ChatTopbar";
import { ChatList } from "./ChatList";
import chatLogo from "@/assets/chat.svg";
import { IUser } from "@/types";
import useConversationStore from "@/store/conversationStore";

interface ChatProps {
  selectedUser: IUser;
  isMobile: boolean;
}

export function Chat({ selectedUser, isMobile }: ChatProps) {
  const { selectedConversation } = useConversationStore();
  return (
    <>
      {selectedConversation._id ? (
        <div className="flex flex-col justify-between w-full h-full">
          <ChatTopbar selectedUser={selectedUser} />

          <ChatList selectedUser={selectedUser} isMobile={isMobile} />
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
