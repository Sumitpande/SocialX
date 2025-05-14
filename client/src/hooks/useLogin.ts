import { useState } from "react";
import { toast } from "sonner";
// import { useAuthContext } from '../context/AuthContext'
import axios from "../utils/axios";
// import useAuthStore from '../store/AuthStore'
import { useNavigate } from "react-router-dom";
import { APP_PATH } from "@/utils";
import { useAuthContext } from "@/context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { refreshUser } = useAuthContext();
  // const { setIsLoggedIn, setToken } = useAuthStore()
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
      // const userResp = await axios.get(
      //     '/me',
      //     {
      //         headers: {
      //             Authorization: `Bearer ${res.data.token}`
      //         },
      //     }
      // )
      // if (userResp.data.error) {
      //     throw new Error(res.data.error)
      // }
      // console.log("userResp", userResp)
      // localStorage.setItem('user', JSON.stringify(res.data.user))
      // setAuthUser(res.data.user)
      // setIsLoggedIn(true)
      // setToken(res.data.token)
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
