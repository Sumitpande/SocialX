import { createContext, useContext, useState, FC, ReactNode } from 'react'
import { IAuthCtx, IUser } from '../types/index'
export const AuthContext = createContext<IAuthCtx>({} as IAuthCtx)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
    children,
}): ReactNode => {
    const [authUser, setAuthUser] = useState({} as IUser)

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}
