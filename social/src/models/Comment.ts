import mongoose, { Schema, Document } from "mongoose";
import { filter } from "../utils/helper";

export interface IComment extends Document {
    id?: string;
    commenter: Schema.Types.ObjectId;
    post: Schema.Types.ObjectId;
    parent: Schema.Types.ObjectId;
    children: Schema.Types.ObjectId[];
    title: string;
    content: string;
    tags?: string[];
    likes?: Number;
    comments?: string[];
    edited?: boolean;
}

const CommentSchema = new Schema<IComment>(
    {
        commenter: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        parent: {
            type: mongoose.Types.ObjectId,
            ref: "comment",
        },
        children: [
            {
                type: mongoose.Types.ObjectId,
                ref: "comment",
            },
        ],
        edited: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

CommentSchema.pre("save", function (next) {
    if (this.content.length > 0) {
        this.content = filter.clean(this.content);
    }

    next();
});

export const Comment = mongoose.model("comment", CommentSchema);
