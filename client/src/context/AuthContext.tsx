import {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  useEffect,
} from "react";
import { IAuthCtx, IUser } from "../types/index";
import axios from "@/utils/axios";
import { toast } from "sonner";
const AuthContext = createContext<IAuthCtx>({} as IAuthCtx);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}): ReactNode => {
  const [authUser, setAuthUser] = useState({} as IUser);
  const [loading, setLoading] = useState(false);

  const refreshUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/me"); // protected route

      setAuthUser(res.data);
    } catch (error) {
      setAuthUser({} as IUser); // unauthenticated
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post("/auth/logout"); // backend clears cookie
      if (res.status !== 200) {
        throw new Error("Failed to log out");
      }
      if (res.data.message) {
        toast.success(res.data.message);
      }
    } finally {
      setAuthUser({} as IUser);
    }
  };
  useEffect(() => {
    refreshUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, loading, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
