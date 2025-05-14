import { useState } from "react";
import axios from "../utils/axios";

import { toast } from "sonner";

const useDeleteUserRequest = () => {
  const [loadingD, setLoadingD] = useState(false);
  const [errorD, setErrorD] = useState(false);

  const deleteRequest = async (to: string) => {
    setLoadingD(true);
    try {
      const res = await axios.post(
        `/delete-follow-request`,
        {
          to,
        },
        {
          headers: {},
        }
      );
      console.log("deleted req res>>>", res);
    } catch (error) {
      setErrorD(true);
      toast.error(error as string);
    } finally {
      setLoadingD(false);
    }
  };

  return { deleteRequest, loadingD, errorD };
};
export default useDeleteUserRequest;
