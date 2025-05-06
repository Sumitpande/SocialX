import mongoose, { Schema } from "mongoose";
import { IConversation } from "../typings";

const conversationSchema = new Schema<IConversation>(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
                default: [],
            },
        ],
        name: {
            type: String,
            default: "",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        isGroup: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
            default: "",
        },
    },
    { timestamps: true },
);

const ConversationModel = mongoose.model<IConversation>("Conversation", conversationSchema);

export default ConversationModel;
