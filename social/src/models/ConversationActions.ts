import { IConversation } from "../typings";
import ConversationModel from "./ConersationModel";

export const getConversation = (query: any = {}) => ConversationModel.findOne(query);

export const getConversations = (query: any = {}) => ConversationModel.find(query);

export const getConversationById = (id: string) => ConversationModel.findById(id);

export const addMessageToConversation = (id: any, message: any) => ConversationModel.findOneAndUpdate({ _id: id }, { $push: { messages: message } });

export const createConversation = (values: Record<string, any>) => new ConversationModel(values).save();

export const deleteDMById = (id: string) => ConversationModel.findOneAndDelete({ _id: id });
