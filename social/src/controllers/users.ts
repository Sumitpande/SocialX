import { Response, Request } from "express";
import { getUserById, getUsers } from "../models/UserActions";
import { getUserRequests } from "../models/UserRequestActions";

export const getFollowings = async (req: Request, res: Response) => {
    try {
        const followings = await getUserById(req.userId.toString()).populate("followings").select("firstName lastName username");
        res.json({
            status: "success",
            data: followings,
        })
            .status(200)
            .end();
    } catch (error) {
        res.sendStatus(400);
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        console.log("getting user");
        const user = await getUserById(req.userId).select("-socket_id");
        console.log("getting user", user);
        res.status(200).json(user);
    } catch (error) {
        res.sendStatus(400);
    }
};

export const getFollowers = async (req: Request, res: Response) => {
    try {
        const followers = await getUserById(req.userId.toString()).populate("followers").select("firstName lastName username");
        res.status(200).json({
            status: "success",
            data: followers,
        });
    } catch (error) {
        res.sendStatus(400);
    }
};

export const getFriendRequests = async (req: Request, res: Response) => {
    try {
        const requests = await getUserRequests(req.userId.toString()).populate("sender", "firstName lastName username");
        console.log("requests", requests);
        res.json(requests).status(200).end();
    } catch (error) {
        res.sendStatus(400);
    }
};

export const getUserSuggestions = async (req: Request, res: Response) => {
    try {
        const users = await getUsers({ verified: false, _id: { $nin: [req.userId] } }).select("firstName lastName username");

        res.json(users).status(200).end();
    } catch (error) {
        res.sendStatus(400);
    }
};
