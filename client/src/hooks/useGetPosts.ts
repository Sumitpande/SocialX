import { useEffect, useState } from "react";

import useAuthStore from "../store/AuthStore";
import { toast } from "sonner";
import axios from "../utils/axios";
import usePostStore from "@/store/PostStore";

const useGetPosts = () => {
    const [loading, setLoading] = useState(false);
    const { posts, setPosts } = usePostStore()
    const { token } = useAuthStore()
    useEffect(() => {
        const getPosts = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`/posts`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("posts>>", res)
                if (res.data.error) throw new Error(res.data.error);
                setPosts(res.data.data);
            } catch (error) {

                toast.error(error as string)
            } finally {
                setLoading(false);
            }
        };

        getPosts();
    }, []);

    return { posts, loading };
};
export default useGetPosts;