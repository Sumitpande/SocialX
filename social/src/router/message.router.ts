import express from "express";
import { verifyToken } from "../middlewares";
import { getMessages, sendMessage, getMyConversations } from "../controllers/message.controller";

export default (router: express.Router) => {
    router.post("/sendMessage/:receiverId", verifyToken, sendMessage);
    router.get("/messages/:userToChatId", verifyToken, getMessages);
    router.get("/conversations", verifyToken, getMyConversations);
};
