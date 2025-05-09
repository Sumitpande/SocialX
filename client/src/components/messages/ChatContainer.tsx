import { cn } from "@/lib/utils";
import React, { useRef } from "react";

import ChatBottombar from "./ChatBottombar";
import { AnimatePresence, motion } from "framer-motion";
import { IMessage, IUser } from "@/types";
import { useAuthContext } from "@/context/AuthContext";
import useConversationStore from "@/store/conversationStore";
import SentMessageTemplate from "./SentMessageTemplate";
import ReplyMessageTemplate from "./ReplyMessageTemplate";

interface ChatListProps {
  isMobile: boolean;
}

export function ChatContainer({ isMobile }: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversationStore();

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [selectedConversation.messages]);

  const getMessageTemplate = (message: IMessage) => {
    if (message.from === authUser._id) {
      return <SentMessageTemplate key={message.createdAt} message={message} />;
    } else {
      const from = selectedConversation.participants.find(
        (user: IUser) => user._id === message.from,
      );
      return (
        <ReplyMessageTemplate
          key={message.createdAt}
          user={from}
          message={message}
        />
      );
    }
  };

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {selectedConversation.messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration:
                    selectedConversation.messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn("flex flex-col gap-2 p-4 whitespace-pre-wrap")}
            >
              {getMessageTemplate(message)}
              {/* <div className="flex gap-3 items-center">
                {message.from !== selectedUser._id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={selectedUser.avatar}
                      alt={selectedUser.avatar}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
                <span className=" bg-accent p-3 rounded-md max-w-xs">
                  {message.text}
                </span>
                {message.from == selectedUser._id && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={authUser.avatar}
                      alt={authUser.avatar}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div> */}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar isMobile={isMobile} />
    </div>
  );
}
