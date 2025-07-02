import { JwtPayload } from "jwt-decode";
import { Socket } from "socket.io-client";

export interface IAuthCtx {
  authUser: IUser;
  setAuthUser: (user: IUser) => void;
  loading: boolean;
  logout: () => object;
  refreshUser: () => object;
}
export interface ISocketCtx {
  socket: Socket;
}

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  _id: string;
  avatar?: string;
  email?: string;
  followers?: Array<string | object>;
  followings?: Array<string | object>;
  isFollowing?: boolean;
}

export interface IMessage {
  _id: string;
  from: string;
  type?: string;
  text?: string;
  file?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IConversation {
  lastMessage?: IMessage;
  isGroup?: boolean;
  name?: string;
  _id: string;
  avatar?: string;
  participants: IUser[];
  messages: IMessage[];
  createdBy?: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IUserRequest {
  _id: string;
  sender: IUser;
}

export interface UserIdJwtPayload extends JwtPayload {
  userId: string;
}

export interface IPost {
  _id: string;
  creator: IUser;
  images: string[];
  content: string;
  likes?: number;
  comments?: number;
  edited?: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IOutgoingCallData {
  callType: string; // audio or video
  conversationId: string; // ID of the conversation
  from: IUser;
  to: IUser[];
}

export interface ICallData {
  from: IUser;
  to: IUser[];
  message: string;
  callType: string;
  isGroup: boolean;
  name: string;
  avatar: string;
}
