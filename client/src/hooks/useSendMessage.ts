import { useState } from "react";
import useConversation from "../store/conversationStore";
import axios from "../utils/axios";

import { toast } from "sonner";
import { useAuthContext } from "@/context/AuthContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { setSelectedConversation, selectedConversation } = useConversation();

  const { authUser } = useAuthContext();
  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const to = selectedConversation?.participants?.find(
        (u) => u._id != authUser?._id
      )?._id;
      console.log(to, authUser._id);

      const res = await axios.post(
        `/sendMessage/${selectedConversation._id}`,
        JSON.stringify({ message }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Msg Sent res>>>", res);
      // const data = await res.json();
      // const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
      //     method: "POST",
      //     headers: {
      //         "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ message }),
      // });
      // const data = await res.json();
      // if (data.error) throw new Error(data.error);

      setSelectedConversation({
        ...selectedConversation,
        messages: [...selectedConversation.messages, res.data],
      });
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
