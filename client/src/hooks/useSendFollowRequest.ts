import { useState } from "react";
import axios from "../utils/axios";

import useAuthStore from "../store/AuthStore";
import { toast } from "sonner";

const useSendFollowRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { token } = useAuthStore();
  const sendRequest = async (to: string) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/create-follow-request`,
        {
          to,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("sendRequest created res>>>", res);
    } catch (error) {
      setError(true);
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, error };
};
export default useSendFollowRequest;
