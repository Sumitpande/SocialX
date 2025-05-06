import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import axios from '../utils/axios';
import { IUser, IUserRequest } from '../types';
import { AxiosResponse } from 'axios';
import { Socket } from 'socket.io-client';

interface UserState {
    suggestions: IUser[];
    userRequests: IUserRequest[];
    followers: IUser[];
    followings: IUser[];
    socket: Socket | null;
    user: IUser;
}

interface UserActions {
    getFollowers: (token: string) => Promise<void>;
    getFollowings: (token: string) => Promise<void>;
    getUserRequests: (token: string) => Promise<void>;
    getUserSuggestions: (token: string) => Promise<void>;
    setSocket: (socket: Socket | null) => void;
    getUser: (token: string) => Promise<void>;
    resetUserStore: () => void;
}

const initialState: UserState = {
    suggestions: [],
    userRequests: [],
    followers: [],
    followings: [],
    socket: null,
    user: {} as IUser,
}



const useUserStore = create<UserState & UserActions>()((set) => ({
    ...initialState,
    resetUserStore: () => { set(initialState) },
    getUserSuggestions: async (token) => {

        axios.get<IUser[], AxiosResponse>('user_suggestions', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            set({ suggestions: res.data })
        })
    },

    getUserRequests: async (
        token
    ) => {
        axios.get<IUser[], AxiosResponse>('user_requests', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log("res>>", res)
            set({ userRequests: res.data })
        })

    },

    getFollowers: async (token) => {

        axios.get<IUser[], AxiosResponse>('followers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            set({ followers: res.data })
        })
    },
    getFollowings: async (token) => {

        axios.get<IUser[], AxiosResponse>('followings', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            set({ followings: res.data })
        })
    },

    setSocket: (socket) => {
        set({ socket: socket })
    },

    getUser: async (token) => {
        return axios.get<IUser[], AxiosResponse>('user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log("user>>", res)
            set({ user: res.data, followers: res.data.followers, followings: res.data.followings })
        })
    },

}));
export default useUserStore;