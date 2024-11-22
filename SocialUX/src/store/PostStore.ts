import { IPost } from '@/types';
import { create } from 'zustand';

interface PostActions {
    setPosts: (value: IPost[]) => void;

    resetPostStore: () => void
}

interface PostState {
    posts: IPost[];

}

const initialState: PostState = {
    posts: [],

}

const usePostStore = create<PostState & PostActions>()((set) => ({
    ...initialState,
    resetPostStore: () => { set(initialState) },
    setPosts: (value: IPost[]) => {
        set({ posts: value })
    },

}));
export default usePostStore;