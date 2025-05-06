import { useEffect, useState } from "react";

import axios from "../utils/axios";
import useAuthStore from "../store/AuthStore";
import { toast } from "sonner";
import {  IUser } from "@/types";
// import { jwtDecode } from 'jwt-decode'
// import { UserIdJwtPayload } from "../types";
const useGetConnections = () => {
    const [loading, setLoading] = useState(false);
    const [connections, setConnections] = useState<IUser[]>([]);
    const { token } = useAuthStore()
    // const userId: string = jwtDecode<UserIdJwtPayload>(token).userId
    useEffect(() => {
        const getConnections = async () => {
            setLoading(true);
            try {
        
                const res = await axios.get("/followings", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("followings", res)
                setConnections(res.data.data.followings);
            } catch (error) {
                toast.error(error as string)
            } finally {
                setLoading(false);
            }
        };

        getConnections();
    }, [token]);

    return { loading, connections };
};
export default useGetConnections;