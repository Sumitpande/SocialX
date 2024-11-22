import express from "express";
import { getFollowers, getFriendRequests, getUserSuggestions, getFollowings, getUser } from "../controllers/users";
import { verifyToken } from "../middlewares";

export default (router: express.Router) => {
    router.get("/followers", verifyToken, getFollowers);
    router.get("/followings", verifyToken, getFollowings);
    router.get("/me", verifyToken, getUser);
    router.get("/user_requests", verifyToken, getFriendRequests);
    router.get("/user_suggestions", verifyToken, getUserSuggestions);
};
