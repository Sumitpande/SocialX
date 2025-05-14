import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

import useAuthStore from "../store/AuthStore";
import useUserStore from "../store/userStore";
import useConversationStore from "../store/conversationStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { APP_PATH } from "@/utils";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const authContext = useAuthContext();
  const { resetAuthStore } = useAuthStore();
  const { resetUserStore } = useUserStore();
  const { resetConversationStore } = useConversationStore();

  const navigate = useNavigate();
  const logout = async () => {
    setLoading(true);
    try {
      authContext.logout();
      resetAuthStore();
      resetConversationStore();
      resetUserStore();
      navigate(APP_PATH.login);
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
