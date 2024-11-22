import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
    id?: string;
    creator: Schema.Types.ObjectId;
    content: string;
    tags?: string[];
    likes?: Number;
    comments?: string[];
    images?: string;
    edited?: boolean;
}

const PostSchema: Schema = new Schema<IPost>(
    {
        creator: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },

        content: {
            type: String,
            required: true,
            maxLength: [8000, "Must be no more than 8000 characters"],
        },
        images: [
            {
                type: String,
            },
        ],
        likes: {
            type: Number,
            default: 0,
        },
        comments: {
            type: Number,
            default: 0,
        },
        edited: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export const Post = mongoose.model<IPost>("Post", PostSchema);
