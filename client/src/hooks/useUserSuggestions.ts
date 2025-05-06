import { useState } from "react";
import userStore from "../store/userStore";
import axios from "../utils/axios";

import useAuthStore from "../store/AuthStore";
import { toast } from "sonner";
import { useAuthContext } from "@/context/AuthContext";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { getUserSuggestions, suggestions } = userStore();
    const { token } = useAuthStore()
    const { authUser } = useAuthContext()
    const sendMessage = async (message: string) => {
        setLoading(true);
        try {
           
            const res = await axios.post(`/sendMessage/${to}`, JSON.stringify({ message }), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("Msg Sent res>>>", res)
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

            setSelectedConversation({ ...selectedConversation, messages: [...selectedConversation.messages, res.data] });
        } catch (error) {
            toast.error(error as string)
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};
export default useSendMessage;