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
    },
    { timestamps: true },
);

const ConversationModel = mongoose.model<IConversation>("Conversation", conversationSchema);

export default ConversationModel;
