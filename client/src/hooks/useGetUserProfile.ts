import { useEffect, useState } from "react";

import { toast } from "sonner";
import axios from "../utils/axios";
import { IUser } from "@/types";

const useGetUserProfile = (username: string) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/user/${username}`, {
          headers: {},
        });
        console.log("user>>", res);
        if (res.data.error) throw new Error(res.data.error);
        setUser(res.data);
      } catch (error) {
        toast.error(error as string);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username]);

  return { user, loading };
};
export default useGetUserProfile;
