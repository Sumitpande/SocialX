import { useState } from "react";
import axios from "../utils/axios";

import { toast } from "sonner";

const useAcceptFollowRequest = () => {
  const [loadingA, setLoadingA] = useState(false);
  const [errorA, setErrorA] = useState(false);

  const acceptRequest = async (requestId: string) => {
    setLoadingA(true);
    try {
      const res = await axios.post(
        `/accept-follow-request`,
        {
          requestId,
        },
        {
          headers: {},
        }
      );
      console.log("Request accept res>>>", res);
    } catch (error) {
      setErrorA(true);
      toast.error(error as string);
    } finally {
      setLoadingA(false);
    }
  };

  return { acceptRequest, loadingA, errorA };
};
export default useAcceptFollowRequest;
