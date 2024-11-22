import { useEffect, useState } from "react";

import axios from "../utils/axios";
import useAuthStore from "../store/AuthStore";
import { toast } from "@/components/ui/use-toast";
import { IConversation } from "@/types";
// import { jwtDecode } from 'jwt-decode'
// import { UserIdJwtPayload } from "../types";
const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState<IConversation[]>([]);
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
                setConversations(res.data);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: `${error}`,

                })
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};
export default useGetConversations;