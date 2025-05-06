import {
  createContext,
  useContext,
  useState,
  FC,
  ReactNode,
  useEffect
} from "react";
import { IAuthCtx, IUser } from "../types/index";
export const AuthContext = createContext<IAuthCtx>({} as IAuthCtx);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children
}): ReactNode => {
  const [authUser, setAuthUser] = useState({} as IUser);
  useEffect(() => {
    console.log("user", localStorage.getItem("user"));
    const user = JSON.parse(localStorage.getItem("user") as string);

    if (user) {
      setAuthUser(user);
      //   dispatch({ type: "LOGIN", payload: user });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
