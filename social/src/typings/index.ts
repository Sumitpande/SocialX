import mongoose, { Document } from "mongoose";
import {} from "./Request";
export interface IMessageType extends Document {
    to: mongoose.Schema.Types.ObjectId;
    from: mongoose.Schema.Types.ObjectId;
    type: string;
    text: string;
    file?: string;
    created_at?: Date;
}

export interface IMessage extends Document {
    participants: Array<mongoose.Schema.Types.ObjectId>;
    messages: Array<IMessageType>;
}

export interface IConversation extends Document<mongoose.Schema.Types.ObjectId> {
    id?: string;
    participants: Array<mongoose.Schema.Types.ObjectId>;
    messages: Array<mongoose.Schema.Types.ObjectId>;
    name: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    lastMessage: mongoose.Schema.Types.ObjectId;
    isGroup: boolean;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
}
