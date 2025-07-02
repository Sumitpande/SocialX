import { useState } from "react";
// import useConversation from "../store/conversationStore";
import axios from "../utils/axios";

import { toast } from "sonner";
import useConversationStore from "@/store/conversationStore";
import { IConversation, IUser } from "@/types";

interface ICallData {
  callType: "audio" | "video";
  conversation: IConversation; // ID of the conversation
  from: IUser; // ID of the user initiating the call
}
const useMakeCall = () => {
  const [loading, setLoading] = useState(false);
  const { setOutgoingCall, setOutgoingCallData } = useConversationStore();

  const makeCall = async (data: ICallData) => {
    setLoading(true);
    try {
      setOutgoingCallData({
        callType: data.callType,
        conversationId: data.conversation._id,
        from: data.from,
        to: data.conversation.participants.filter(
          (user) => user._id !== data.from._id
        ),
      });
      setOutgoingCall(true);
      const res = await axios.post(
        `/make/call`,
        {
          conversationId: data.conversation._id,
          from: data.from._id,
          callType: data.callType,
        },
        {
          headers: {},
        }
      );
      console.log("made call>>>", res);

      // setSelectedConversation({ ...selectedConversation, messages: [...selectedConversation.messages, res.data] });
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { makeCall, loading };
};
export default useMakeCall;
