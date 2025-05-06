import { useState } from "react";
import { toast } from "sonner";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { APP_PATH } from "@/utils";

const useRegester = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (values: {
    firstName: string;
    lastName: string;
    gender: string;
    username: string;
    email: string;
    password: string;
  }) => {
    const success = handleInputErrors(values);
    if (!success) return;
    setLoading(true);
    try {
      const res = await axios.post("auth/register", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("login res", res);
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      toast.success(res.data.message)
     
      navigate( APP_PATH.login);
    } catch (error) {
      console.error(error);
      toast.error(error as string)
    } finally {
      setLoading(false);
    }
  };

  return { loading, register };
};
export default useRegester;

function handleInputErrors(values: { email: string; password: string }) {
  if (!values.email || !values.password) {

    toast.error("Please fill in all fields")
    return false;
  }

  return true;
}
