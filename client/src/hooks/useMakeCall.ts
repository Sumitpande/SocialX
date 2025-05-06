import { useState } from "react";
// import useConversation from "../store/conversationStore";
import axios from "../utils/axios";

import useAuthStore from "../store/AuthStore";
import { toast } from "sonner";

interface ICallData {
  callType: "audio" | "video";
  conversationId: string; // ID of the conversation
  from: string; // ID of the user initiating the call
}
const useMakeCall = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // const { setSelectedConversation, selectedConversation } = useConversation();
  const { token } = useAuthStore();
  const makeCall = async (data: ICallData) => {
    setLoading(true);
    try {
      setOpen(true);
      const res = await axios.post(
        `/make/call`,
        JSON.stringify({
          conversationId: data.conversationId,
          from: data.from,
          callType: data.callType,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("made call>>>", res);

      // setSelectedConversation({ ...selectedConversation, messages: [...selectedConversation.messages, res.data] });
    } catch (error) {
      toast.error(error as string)
    } finally {
      setLoading(false);
    }
  };

  return { makeCall, loading,open,setOpen };
};
export default useMakeCall;
