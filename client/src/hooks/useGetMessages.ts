import { useEffect, useState } from "react";
import useConversationStore from "../store/conversationStore";
import useAuthStore from "../store/AuthStore";
import { toast } from "sonner";
import axios from "../utils/axios";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversationStore();
    const { token } = useAuthStore()
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/messages/${selectedConversation._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("msg>>", res)
                // if (data.error) throw new Error(data.error);
                setMessages(res.data.messages);
            } catch (error) {
                toast.error(error as string)
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};
export default useGetMessages;