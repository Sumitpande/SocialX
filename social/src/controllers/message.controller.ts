import { createConversation, addMessageToConversation, getConversation, getConversations, getConversationById } from "../models/ConversationActions";
import { createMessage } from "../models/MessageActions";
import { getUserById } from "../models/UserActions";
import { io } from "../socket/socket";
import { Response, Request } from "express";
import { createCall } from "../models/CallActions";
import { IUser } from "../models/User";
export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const { conversationId } = req.params;
        const senderId = req.userId;
        if (!conversationId) {
            return res.sendStatus(400);
        }
        let conversation: any = await getConversationById(conversationId);

        const newMessage = {
            from: senderId,
            text: message,
        };
        const newMessageObj = await createMessage(newMessage);
        //const receiver = await getUserById(receiverId).select("socket_id");
        console.log("conversation dd", conversation);
        conversation = await addMessageToConversation(conversation._id, newMessageObj._id);
        const populatedConversation = await conversation.populate("participants", "socket_id");
        // SOCKET IO FUNCTIONALITY WILL GO HERE
        // const receiverSocketId = receiver?.socket_id;
        console.log(`populatedConversation >>${populatedConversation}`);
        if (populatedConversation.participants) {
            populatedConversation.participants.forEach((participant: any) => {
                if (participant.socket_id && participant._id.toString() !== senderId.toString()) {
                    io.to(participant.socket_id).emit("newMessage", {
                        conversationId: conversation._id,
                        message: newMessageObj,
                    });
                    console.log("sending message to id", senderId, populatedConversation.participants.length, participant._id);
                }
            });
            // io.to(<socket_id>).emit() used to send events to specific client
            // io.to(receiverSocketId).emit("newMessage", newMessageObj);
        }

        res.status(201).json(newMessageObj);
    } catch (error: any) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createEmptyConversation = async (req: Request, res: Response) => {
    try {
        const { members, name } = req.body;
        const senderId = req.userId;

        const conversation = await createConversation({
            participants: [senderId, ...members],
            messages: [],
            isGroup: members.length > 1,
            name: name || "",
            createdBy: senderId,
            lastMessage: null,
            avatar: "",
        });
        const populated = await conversation.populate("participants", "firstName lastName avatar status");
        if (!name && populated.participants.length > 2) {
            populated.name = populated.participants.map((p: any) => p.firstName).join(", ");
            populated.save();
            console.log("populated name>>", [senderId, ...members].length > 2);
        }
        res.status(201).json(populated);
    } catch (error: any) {
        console.log("Error in creating conversation: ", error.message);
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
        // const arrPart = conversations.map((c) => c.participants);
        // let chats: any = [];
        // arrPart.forEach((p) => {
        //     chats.push(...p);
        // });
        // chats = chats.filter((c: any) => c._id.toString() != senderId);
        console.log("getting conversation>>> ", conversations);
        // if (!conversations) return res.status(200).json([]);
        res.status(200).json(conversations);
    } catch (error: any) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const makeCall = async (req: Request, res: Response) => {
    try {
        const { callType, conversationId } = req.body;
        const senderId = req.userId;
        console.log("getting call for ", conversationId);
        const toConversation = await getConversationById(conversationId).populate("participants", "socket_id email status firstName lastName");
        console.log("toConversation", toConversation);
        const to = toConversation?.participants.filter((p: any) => p._id.toString() !== senderId.toString()) || [];
        const from: any = toConversation?.participants.find((p: any) => p._id.toString() === senderId.toString());
        const call = await createCall(senderId, conversationId, callType);
        to.forEach((recipient: any) => {
            io.to(recipient?.socket_id).emit("incoming_call", {
                message: "Incoming call",
                from: {
                    firstName: from?.firstName,
                    lastName: from?.lastName,
                    status: from?.status,
                },
                callType: callType,
            });
        });

        res.status(200).json(call);
    } catch (error: any) {
        console.log("Error in make call controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
