import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

import { IUser } from "../types";
import axios from "../utils/axios";
import useAuthStore from "../store/AuthStore";
import useUserStore from "../store/userStore";
import useConversationStore from "../store/conversationStore";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { APP_PATH } from "@/utils/path";


const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const { resetAuthStore } = useAuthStore()
    const { resetUserStore } = useUserStore()
    const { resetConversationStore } = useConversationStore()

    const navigate = useNavigate()
    const logout = async () => {
        setLoading(true);
        try {
            const res = await axios.post("/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const data = res.data;
            if (data.error) {
                throw new Error(data.error)
            }
            if (data.message) {
                toast({
                    title: data.message,
                })
            }
            resetAuthStore()
            resetConversationStore()
            resetUserStore()
            localStorage.removeItem("jwt");
            setAuthUser({} as IUser);
            navigate(APP_PATH.login)
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

    return { loading, logout };
};
export default useLogout;