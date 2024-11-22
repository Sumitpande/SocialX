import mongoose, { Schema, Document } from "mongoose";

export interface IUserRequest extends Document {
    sender: mongoose.ObjectId;
    recipient: mongoose.ObjectId;
}

const UserRequestSchema: Schema = new Schema<IUserRequest>(
    {
        sender: {
            type: Schema.ObjectId,
            ref: "User",
        },
        recipient: {
            type: Schema.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true },
);

export const UserRequestModel = mongoose.model<IUserRequest>("UserRequest", UserRequestSchema);
