import { JwtPayload } from "jwt-decode";
import { Socket } from "socket.io-client";

export interface IAuthCtx {
    authUser: IUser;
    setAuthUser: (user: IUser) => void;

}
export interface ISocketCtx {
    socket: Socket;
}

export interface IUser {
    firstName: string,
    lastName: string,
    username: string,
    _id: string,
    avatar?: string,
    email?: string;
}

export interface IMessage {
    _id: string;
    to: string;
    from: string;
    type?: string;
    text?: string;
    file?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IConversation {
    firstName?: string,
    lastName?: string,
    username?: string,
    _id: string,
    avatar?: string
    participants: IUser[];
    messages: IMessage[]
}

export interface IUserRequest {
    _id: string,
    sender: IUser
}

export interface UserIdJwtPayload extends JwtPayload {
    userId: string;
}

export interface IPost {
    _id: string;
    creator: string;
    content: string;
    likes?: number;
    comments?: number;
    edited?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
