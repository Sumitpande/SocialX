import { useState } from "react";
import axios from "../utils/axios";

import { toast } from "sonner";
import useConversationStore from "@/store/conversationStore";

const useCreateConversation = () => {
  const [loading, setLoading] = useState(false);
  const { setSelectedConversation, conversations, setConversations } =
    useConversationStore();

  const createConversation = async (members: string[]) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/conversation/new`,
        {
          members: members,
        },
        {
          headers: {},
        }
      );
      console.log("conversation created res>>>", res.data);

      setConversations([res.data, ...conversations]);
      setSelectedConversation(res.data);
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { createConversation, loading };
};
export default useCreateConversation;
