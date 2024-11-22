import express from "express";
import { createPost, getPosts } from "../controllers/posts";
import { verifyToken } from "../middlewares";

export default (router: express.Router) => {
    router.post("/post", verifyToken, createPost);
    router.get("/posts", verifyToken, getPosts);
    // router.get("/post/:id", verifyToken, getPost);
};
