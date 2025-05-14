import { useEffect, useState } from "react";

import { toast } from "sonner";
import axios from "../utils/axios";
import { IPost } from "@/types";

const useGetPostDetails = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({} as IPost);

  useEffect(() => {
    getPostDetails(id);
  }, [id]);

  const getPostDetails = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`/post/${id}`, {
        headers: {},
      });
      console.log("post detail>>", res.data);
      //   if (res.data.error) throw new Error(res.data.error);
      setPost(res.data);
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { post, loading };
};
export default useGetPostDetails;
