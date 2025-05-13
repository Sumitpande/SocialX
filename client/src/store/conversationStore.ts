import { create } from "zustand";
// import { persist } from 'zustand/middleware';
import { ICallData, IConversation, IOutgoingCallData } from "../types/index";

interface ConversationActions {
  setIncomingCall: (incomingCall: boolean) => void;
  setOutgoingCall: (outgoingCall: boolean) => void;
  setCallData: (callData: ICallData) => void;
  setOutgoingCallData: (outGoingCallData: IOutgoingCallData) => void;
  setConversations: (value: IConversation[]) => void;
  setSelectedConversation: (selectedConversation: IConversation) => void;
  resetConversationStore: () => void;
}

interface ConversationState {
  incomingCall: boolean;
  outgoingCall: boolean;
  callData: ICallData;
  outGoingCallData: IOutgoingCallData;

  conversations: IConversation[];
  selectedConversation: IConversation;
}

const initialState: ConversationState = {
  incomingCall: false,
  outgoingCall: false,
  callData: {} as ICallData,
  outGoingCallData: {} as IOutgoingCallData,
  conversations: [] as IConversation[],
  selectedConversation: {} as IConversation,
};

const useConversationStore = create<ConversationState & ConversationActions>()(
  (set) => ({
    ...initialState,
    setIncomingCall: (incomingCall: boolean) => {
      set({ incomingCall });
    },
    setOutgoingCall: (outgoingCall: boolean) => {
      set({ outgoingCall });
    },
    setOutgoingCallData: (outGoingCallData: IOutgoingCallData) => {
      set({ outGoingCallData });
    },
    resetConversationStore: () => {
      set(initialState);
    },
    setCallData: (callData: ICallData) => {
      set({ callData });
    },

    setConversations: (value: IConversation[]) => {
      set({ conversations: value });
    },

    setSelectedConversation: (selectedConversation: IConversation) =>
      set({ selectedConversation }),
  })
);
export default useConversationStore;
