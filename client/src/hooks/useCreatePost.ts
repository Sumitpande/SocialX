import { useState } from "react";
import axios from "../utils/axios";

import { toast } from "sonner";
import usePostStore from "@/store/PostStore";

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const { posts, setPosts } = usePostStore();

  const createPost = async (content: string, files: Array<File>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("content", content);
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      const res = await axios.post(`/post`, formData, {
        headers: {},
      });
      console.log("post created res>>>", res);
      setPosts([res.data, ...posts]);
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  return { createPost, loading };
};
export default useCreatePost;
