import express from "express";
import { verifyToken } from "../middlewares";
import { getMessages, sendMessage, getMyConversations, createEmptyConversation, makeCall } from "../controllers/message.controller";

export default (router: express.Router) => {
    router.post("/sendMessage/:conversationId", verifyToken, sendMessage);
    router.get("/messages/:userToChatId", verifyToken, getMessages);
    router.get("/conversations", verifyToken, getMyConversations);
    router.post("/conversation/new", verifyToken, createEmptyConversation);
    router.post("/make/call/", verifyToken, makeCall);
};
