import { useEffect, useState } from "react";

import axios from "../utils/axios";
import useAuthStore from "../store/AuthStore";
import { toast } from "sonner";
// import { IConversation } from "@/types";
import useConversationStore from "@/store/conversationStore";
// import { jwtDecode } from 'jwt-decode'
// import { UserIdJwtPayload } from "../types";
const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const {conversations,setConversations} = useConversationStore()
    // const [conversations, setConversations] = useState<IConversation[]>([]);
    const { token } = useAuthStore()
    // const userId: string = jwtDecode<UserIdJwtPayload>(token).userId
    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/conversations", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("conversations", res)
                setConversations(res.data);
                // const data = await res.json();
                // if (data.error) {
                //     throw new Error(data.error);
                // }
                // if (res.data.length == 0) {
                //     const followings = await axios.get("/followings", {
                //         headers: {
                //             Authorization: `Bearer ${token}`
                //         }
                //     });
                //     console.log("followings", followings)
                //     setConversations(followings.data.data.followings);
                // } else {
                //     setConversations(res.data);
                // }
            } catch (error) {
                toast.error(error as string)
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, [token]);

    return { loading, conversations };
};
export default useGetConversations;