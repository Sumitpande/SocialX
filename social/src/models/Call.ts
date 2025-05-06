import mongoose, { Schema, Document } from "mongoose";

interface ICall extends Document {
    isGroupCall: boolean;
    conversationId: mongoose.Types.ObjectId; // Reference to the Conversation collection
    startedAt: Date; // Timestamp for when the call started
    endedAt?: Date; // Optional timestamp for when the call ended
    status: "ongoing" | "ended" | "missed"; // Status of the call
    initiatedBy: mongoose.Types.ObjectId; // Reference to the User who initiated the call
    createdAt: Date;
    updatedAt: Date;
}

const CallSchema: Schema = new Schema(
    {
        isGroupCall: { type: Boolean, required: false },
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: "Conversation", // Reference to the Conversation model
            required: true,
        },
        startedAt: {
            type: Date,
            required: true,
        },
        endedAt: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["ongoing", "ended", "missed"],
            required: true,
        },
        callType: {
            type: String,
            enum: ["audio", "video"],
            required: true,
        },
        initiatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    },
);

const Call = mongoose.model<ICall>("Call", CallSchema);

export default Call;
