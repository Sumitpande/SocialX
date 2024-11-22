import mongoose, { Document } from "mongoose";
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

export interface IConversation extends Document {
    id?: string;
    participants: Array<mongoose.Schema.Types.ObjectId>;
    messages: Array<mongoose.Schema.Types.ObjectId>;
}
