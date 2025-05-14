import { create } from "zustand";
// import { persist } from 'zustand/middleware';
import axios from "../utils/axios";
import { IUser, IUserRequest } from "../types";
import { AxiosResponse } from "axios";
import { Socket } from "socket.io-client";

interface UserState {
  suggestions: IUser[];
  userRequests: IUserRequest[];
  followers: IUser[];
  followings: IUser[];
  socket: Socket | null;
  user: IUser;
}

interface UserActions {
  getFollowers: () => Promise<void>;
  getFollowings: () => Promise<void>;
  getUserRequests: () => Promise<void>;
  getUserSuggestions: () => Promise<void>;
  setSocket: (socket: Socket | null) => void;
  getUser: () => Promise<void>;
  resetUserStore: () => void;
}

const initialState: UserState = {
  suggestions: [],
  userRequests: [],
  followers: [],
  followings: [],
  socket: null,
  user: {} as IUser,
};

const useUserStore = create<UserState & UserActions>()((set) => ({
  ...initialState,
  resetUserStore: () => {
    set(initialState);
  },
  getUserSuggestions: async () => {
    axios
      .get<IUser[], AxiosResponse>("user_suggestions", {
        headers: {},
      })
      .then((res) => {
        set({ suggestions: res.data });
      });
  },

  getUserRequests: async () => {
    axios
      .get<IUser[], AxiosResponse>("user_requests", {
        headers: {},
      })
      .then((res) => {
        console.log("res>>", res);
        set({ userRequests: res.data });
      });
  },

  getFollowers: async () => {
    axios
      .get<IUser[], AxiosResponse>("followers", {
        headers: {},
      })
      .then((res) => {
        set({ followers: res.data });
      });
  },
  getFollowings: async () => {
    axios
      .get<IUser[], AxiosResponse>("followings", {
        headers: {},
      })
      .then((res) => {
        set({ followings: res.data });
      });
  },

  setSocket: (socket) => {
    set({ socket: socket });
  },

  getUser: async () => {
    return axios
      .get<IUser[], AxiosResponse>("user", {
        headers: {},
      })
      .then((res) => {
        console.log("user>>", res);
        set({
          user: res.data,
          followers: res.data.followers,
          followings: res.data.followings,
        });
      });
  },
}));
export default useUserStore;
