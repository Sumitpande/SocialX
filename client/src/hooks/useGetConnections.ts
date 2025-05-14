import { useEffect, useState } from "react";

import axios from "../utils/axios";

import { toast } from "sonner";
import { IUser } from "@/types";

const useGetConnections = () => {
  const [loading, setLoading] = useState(false);
  const [connections, setConnections] = useState<IUser[]>([]);

  useEffect(() => {
    const getConnections = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/followings", {
          headers: {},
        });
        console.log("followings", res);
        setConnections(res.data.data.followings);
      } catch (error) {
        toast.error(error as string);
      } finally {
        setLoading(false);
      }
    };

    getConnections();
  }, []);

  return { loading, connections };
};
export default useGetConnections;
