import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../store/conversationStore";

import notificationSound from "../assets/notification.mp3";
// import { ISocketCtx } from "../types";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {

        socket?.on("newMessage", (newMessage) => {
            console.log("listening socket", socket)
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setSelectedConversation({ ...selectedConversation, messages: [...selectedConversation.messages, newMessage] });
        });

        return () => { socket?.off("newMessage") };
    }, [socket, selectedConversation]);
};
export default useListenMessages;