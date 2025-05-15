import { useCallback, useEffect, useMemo, useRef } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/conversationStore";

import notificationSound from "../assets/notification.mp3";
import { IMessage } from "@/types";
import { debounce } from "lodash";
// import { ISocketCtx } from "../types";
type INewMessage = {
  message: IMessage;
  conversationId: string;
  shouldShake?: boolean;
};
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const {
    selectedConversation,
    setSelectedConversation,
    conversations,
    setConversations,
  } = useConversation();

  const playSound = useCallback(() => {
    if (audioRef.current) {
      console.log("hey");
      audioRef.current.currentTime = 0; // rewind to start
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      audioRef.current.play().catch((e: any) => {
        console.warn("Audio playback failed:", e);
      });
    }
  }, []);
  const debouncedPlaySound = useMemo(
    () => debounce(playSound, 1000),
    [playSound]
  );
  const handleNewMessage = useCallback(
    (data: INewMessage) => {
      console.log("listening socket", data);
      // const newMessage: INewMessage = {
      //   message: data.message,
      //   conversationId: data.conversationId,
      //   shouldShake: data.shouldShake ?? false,
      // };

      // newMessage.shouldShake = true;
      debouncedPlaySound();

      if (selectedConversation._id == data.conversationId) {
        setSelectedConversation({
          ...selectedConversation,
          messages: [...selectedConversation.messages, data.message],
        });
      }
      const c = conversations.find(
        (conversation) => conversation._id == data.conversationId
      );
      if (c) {
        setConversations([
          ...conversations.filter(
            (conversation) => conversation._id !== data.conversationId
          ),
          { ...c, messages: [...c.messages, data.message] },
        ]);
      }
    },
    [
      debouncedPlaySound,
      selectedConversation,
      conversations,
      setSelectedConversation,
      setConversations,
    ]
  );

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => handleNewMessage(newMessage));
    audioRef.current = new Audio(notificationSound);
    audioRef.current.load();
    return () => {
      socket?.off("newMessage", (newMessage) => handleNewMessage(newMessage));
      debouncedPlaySound.cancel(); // clean up on unmount
    };
  }, [socket, selectedConversation, handleNewMessage, debouncedPlaySound]);
};
export default useListenMessages;
