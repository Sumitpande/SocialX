import { useState } from "react";
import axios from "../utils/axios";

import useAuthStore from "../store/AuthStore";
import { toast } from "@/components/ui/use-toast";
import usePostStore from "@/store/PostStore";

const useCreatePost = () => {
    const [loading, setLoading] = useState(false);
    const { posts, setPosts } = usePostStore();
    const { token } = useAuthStore()
    const createPost = async (content: string) => {
        setLoading(true);
        try {


            const res = await axios.post(`/post`, JSON.stringify({ content }), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("post created res>>>", res)
            setPosts([res.data, ...posts])
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: `${error}`,

            })
        } finally {
            setLoading(false);
        }
    };

    return { createPost, loading };
};
export default useCreatePost;