import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    gender: string;
    authentication: {
        password: string;
        salt?: string;
        sessionToken?: string;
        passwordChangedAt?: Date;
        passwordResetToken?: string;
        passwordResetExpires?: Date;
    };
    verified?: boolean;
    socket_id?: string;
    avatar?: string;
    status?: string;
    followings: Array<Schema.Types.ObjectId>;
    followers: Array<Schema.Types.ObjectId>;
}

const UserSchema: Schema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: [true, "First Name is required."],
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required."],
        },
        username: {
            type: String,
            required: [true, "Username is required."],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required."],
            validate: {
                validator: (email: string) => {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                },
                message: (props: any) => `Email (${props.value}) is not in valid format.`,
            },
        },
        authentication: {
            password: {
                type: String,
                required: true,
                select: false,
            },
            salt: {
                type: String,
                select: false,
            },
            sessionToken: {
                type: String,
                select: false,
            },
            passwordChangedAt: {
                type: Date,
            },
            passwordResetToken: {
                type: String,
            },
            passwordResetExpires: {
                type: Date,
            },
        },
        verified: {
            type: Boolean,
            default: false,
        },
        socket_id: {
            type: String,
        },
        status: {
            type: String,
        },
        avatar: {
            type: String,
        },
        gender: {
            type: String,
        },
        followings: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true },
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
