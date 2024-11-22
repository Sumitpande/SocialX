import { IMessage } from "../typings";
import { MessageModel } from "./DirectMessage";

export const getMessage = (query: any = {}) => MessageModel.findOne(query);
export const getConversations = (query: any = {}) => MessageModel.find(query);

export const getDMById = (id: string) => MessageModel.findById(id);

export const createMessage = (values: Record<string, any>) => new MessageModel(values).save().then((msg) => msg.toObject());

export const deleteDMById = (id: string) => MessageModel.findOneAndDelete({ _id: id });
