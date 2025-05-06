import express from "express";
import { createPost, getPosts, getPost } from "../controllers/posts";
import { verifyToken, upload } from "../middlewares";

export default (router: express.Router) => {
    router.post("/post", verifyToken, upload.array("files"), createPost);
    router.get("/posts", verifyToken, getPosts);
    router.get("/post/:id", verifyToken, getPost);
};
