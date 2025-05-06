import { useCallback, useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/conversationStore";

import notificationSound from "../assets/notification.mp3";
import { IMessage } from "@/types";
// import { ISocketCtx } from "../types";
type INewMessage = {
  message: IMessage;
  conversationId: string;
  shouldShake?: boolean;
};
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const {
    selectedConversation,
    setSelectedConversation,
    conversations,
    setConversations,
  } = useConversation();

  const handleNewMessage = useCallback(
    (data: INewMessage) => {
      console.log("listening socket", data);
      const newMessage: INewMessage = {
        message: data.message,
        conversationId: data.conversationId,
        shouldShake: data.shouldShake ?? false,
      };

      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      if (selectedConversation._id == data.conversationId) {
        setSelectedConversation({
          ...selectedConversation,
          messages: [...selectedConversation.messages, data.message],
        });
      } 
        const c = conversations.find(
          (conversation) => conversation._id == data.conversationId,
        );
        if (c) {
          setConversations([
            ...conversations.filter(
              (conversation) => conversation._id !== data.conversationId,
            ),
            { ...c, messages: [...c.messages, data.message] },
          ]);
        }
      
    },
    [selectedConversation, conversations, setSelectedConversation, setConversations],
  );

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => handleNewMessage(newMessage));

    return () => {
      socket?.off("newMessage", (newMessage) => handleNewMessage(newMessage));
    };
  }, [socket, selectedConversation, handleNewMessage]);
};
export default useListenMessages;
