import { useState } from "react";
import { toast } from "sonner";
import axios from "../utils/axios";

import { useNavigate } from "react-router-dom";
import { APP_PATH } from "@/utils";
import { useAuthContext } from "@/context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { refreshUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async (values: { email: string; password: string }) => {
    const success = handleInputErrors(values);
    if (!success) return;
    setLoading(true);
    try {
      const res = await axios.post("auth/login", values, {
        headers: {},
      });

      if (res.data.error) {
        throw new Error(res.data.error);
      }
      refreshUser();
      navigate(APP_PATH.general.home);
      console.log("login res", res);
    } catch (error) {
      console.error(error);
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(values: { email: string; password: string }) {
  if (!values.email || !values.password) {
    toast.error("Email or password must not be empty.");
    return false;
  }

  return true;
}
