import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import { IConversation, IMessage } from '../types/index'



interface ConversationActions {
    setMessages: (value: IMessage[]) => void;
    setSelectedConversation: (selectedConversation: IConversation) => void;
    resetConversationStore: () => void
}

interface ConversationState {
    messages: IMessage[];
    selectedConversation: IConversation;
}

const initialState: ConversationState = {
    messages: [],
    selectedConversation: {} as IConversation,
}

const useConversationStore = create<ConversationState & ConversationActions>()((set) => ({
    ...initialState,
    resetConversationStore: () => { set(initialState) },
    setMessages: (value: IMessage[]) => {
        set({ messages: value })
    },

    setSelectedConversation: (selectedConversation: IConversation) => set({ selectedConversation }),
}));
export default useConversationStore;