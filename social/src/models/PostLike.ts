import mongoose, { Schema, Document } from "mongoose";

export interface IPostLike extends Document {
    postId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
}

const PostLikeSchema: Schema = new mongoose.Schema<IPostLike>(
    {
        postId: {
            type: mongoose.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

export const PostLike = mongoose.model("PostLike", PostLikeSchema);
