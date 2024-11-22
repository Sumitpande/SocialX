import { createConversation, addMessageToConversation, getConversation, getConversations } from "../models/ConversationActions";
import { createMessage } from "../models/DMActions";
import { getUserById } from "../models/UserActions";
import { io } from "../socket/socket";
import { Response, Request } from "express";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const { receiverId } = req.params;
        const senderId = req.userId;
        let conversation = await getConversation({
            participants: { $all: [senderId, receiverId] },
        });
        const newMessage = {
            from: senderId,
            to: receiverId,
            text: message,
        };
        const newMessageObj = await createMessage(newMessage);
        const receiver = await getUserById(receiverId).select("socket_id");

        if (!conversation) {
            conversation = await createConversation({
                participants: [senderId, receiverId],
                messages: [newMessageObj._id],
            });
        } else {
            conversation = await addMessageToConversation(conversation._id, newMessageObj._id);
        }

        // SOCKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = receiver?.socket_id;
        console.log(`sending to socket >>${receiver}`);
        if (receiverSocketId) {
            // io.to(<socket_id>).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessageObj);
        }

        res.status(201).json(newMessageObj);
    } catch (error: any) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { userToChatId } = req.params;
        const senderId = req.userId;
        console.log("getting msg of user ", userToChatId);
        const conversation = await getConversation({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES
        // const conversation = await getDMById(userToChatId);
        console.log("getting conversation", conversation);
        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(conversation);
    } catch (error: any) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMyConversations = async (req: Request, res: Response) => {
    try {
        const senderId = req.userId;
        const conversations = await getConversations({
            participants: senderId,
        })
            .populate("participants", "firstName lastName avatar status")
            .populate("messages");
        console.log("conversations-----", conversations);
        const arrPart = conversations.map((c) => c.participants);
        let chats: any = [];
        arrPart.forEach((p) => {
            chats.push(...p);
        });
        chats = chats.filter((c: any) => c._id.toString() != senderId);
        console.log("getting conversation>>> ", chats);
        if (!chats) return res.status(200).json([]);
        res.status(200).json(conversations);
    } catch (error: any) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
