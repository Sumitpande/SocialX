import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import {  IConversation } from '../types/index'



interface ConversationActions {
    setConversations: (value: IConversation[]) => void;
    setSelectedConversation: (selectedConversation: IConversation) => void;
    resetConversationStore: () => void
}

interface ConversationState {
    conversations: IConversation[];
    selectedConversation: IConversation;
}

const initialState: ConversationState = {
    conversations: [] as IConversation[],
    selectedConversation: {} as IConversation,
}

const useConversationStore = create<ConversationState & ConversationActions>()((set) => ({
    ...initialState,
    resetConversationStore: () => { set(initialState) },
    setConversations: (value: IConversation[]) => {
        set({ conversations: value })
    },

    setSelectedConversation: (selectedConversation: IConversation) => set({ selectedConversation }),
}));
export default useConversationStore;