import { useSocketContext } from "@/context/SocketContext";
import { useEffect } from "react";
import CallTune from "../assets/call.mp3";
import { ICallData } from "@/types";
import useConversationStore from "@/store/conversationStore";

// Define a custom type for the error
interface IError {
  message: string;
  code?: string; // Optional error code
}

const useListenCall = () => {
  const { socket } = useSocketContext();
  //   const [incomingCall, setIncomingCall] = useState(false);
  //   const [callData, setCallData] = useState({} as ICallData);
  const { setCallData, setIncomingCall } = useConversationStore();
  useEffect(() => {
    console.log("Socket in useListenCall:", socket);

    // Handle incoming events
    socket?.on("incoming_call", (data) => {
      console.log("Incoming call data:", data);
      onCallStarted(data);
      socket.emit("call-ringing", data);
    });

    socket?.on("callEnded", (data) => {
      onCallEnded(data);
    });

    socket?.on("error", (error) => {
      onError(error);
    });

    return () => {
      // Clean up the event listeners when the component unmounts
      socket?.off("incoming_call");
      socket?.off("callEnded");
      socket?.off("error");
    };
  }, [socket]);

  // const startCall = (callData: ICallData) => {
  //     if (socket) {
  //         socket.emit('incoming_call', { ...callData });
  //     }
  // };

  // const endCall = (callData:ICallData ) => {
  //     if (socket) {
  //         socket.emit('endCall', callData);
  //     }
  // };
  const onCallStarted = (data: ICallData) => {
    console.log("Call started:", data);
    const sound = new Audio(CallTune);
    sound.play();
    setCallData(data);
    setIncomingCall(true);
    console.log("Incoming call data:", data);
    // setCallData(data);
    // Handle the call started event (e.g., show a notification, update UI, etc.)
  };
  const onCallEnded = (data: ICallData) => {
    console.log("Call ended:", data);
    // Handle the call ended event (e.g., show a notification, update UI, etc.)
  };
  const onError = (error: IError) => {
    console.error("Error:", error);
  };

  return { setIncomingCall };
};

export default useListenCall;
