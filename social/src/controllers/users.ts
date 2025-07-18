import { Response, Request } from "express";
import { getUserById, getUserByUsername, getUsers } from "../models/UserActions";
import {
    createUserRequest,
    deleteUserRequest,
    deleteUserRequestById,
    getUserRequests,
    getUserRequestsById,
    getUserRequestsSent,
} from "../models/UserRequestActions";
import { IUser } from "../models/User";
const { ObjectId } = require("mongodb");

export const acceptFollowRequest = async (req: Request, res: Response) => {
    try {
        const { requestId } = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.sendStatus(400);
        }
        const request = await getUserRequestsById(requestId);
        if (!request) {
            res.json({ message: "Invalid Request Id" }).status(400).end();
        } else {
            const user: any = await getUserById(userId);
            user?.followers.push(request?.sender);
            user?.save();
            const sender = await getUserById(request?.sender.toString());
            sender?.followings.push(user?._id);
            sender?.save();
            await deleteUserRequestById(requestId);
        }

        res.json({ message: "Follow Request Deleted." }).status(200).end();
    } catch (error) {
        res.sendStatus(400);
    }
};

export const deleteFollowRequest = async (req: Request, res: Response) => {
    try {
        const { to } = req.body;
        await deleteUserRequest({
            sender: req.userId,
            recipient: to,
        });
        res.json({ message: "Follow Request Deleted." }).status(200).end();
    } catch (error) {
        res.sendStatus(400);
    }
};

export const createFollowRequest = async (req: Request, res: Response) => {
    try {
        const { to } = req.body;
        const userId = req.userId;
        const userRequest = await createUserRequest({
            sender: userId,
            recipient: to,
        });
        res.json(userRequest).status(200).end();
    } catch (error) {
        res.sendStatus(400);
    }
};

export const getFollowings = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.sendStatus(400);
        }
        const followings = await getUserById(userId).populate("followings").select("firstName lastName username");
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
        const userId = req.userId;
        const { username } = req.params;
        if (!userId || !username) {
            return res.sendStatus(400);
        }
        const user = await getUserByUsername(username).select("firstName lastName avatar username createdAt followers followings");
        console.log("getting user>>", user);
        const userObjectId = new ObjectId(userId);
        const data = {
            ...user?.toObject(),
            isFollowing: user?.followers.includes(userObjectId),
        };
        res.status(200).json(data);
    } catch (error) {
        res.sendStatus(400);
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        console.log("getting user");
        const userId = req.userId;
        if (!userId) {
            return res.sendStatus(400);
        }
        const user = await getUserById(userId).select("-socket_id");
        console.log("getting user", user);
        res.status(200).json(user);
    } catch (error) {
        res.sendStatus(400);
    }
};

export const getFollowers = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.sendStatus(400);
        }
        const followers = await getUserById(userId).populate("followers").select("firstName lastName username");
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
        const userId = req.userId;
        if (!userId) {
            return res.sendStatus(400);
        }
        const requests = await getUserRequests(userId).populate("sender", "firstName lastName username");
        console.log("requests", requests);
        res.json(requests).status(200).end();
    } catch (error) {
        res.sendStatus(400);
    }
};

export const getUserSuggestions = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.sendStatus(400);
        }
        const currentUser = await getUserById(userId).populate("followings");

        if (!currentUser) return res.status(404).json({ message: "User not found" });

        // Find users you've already sent a follow request to
        const RequestsSent = await getUserRequestsSent(userId);
        const RequestsRecieved = await getUserRequests(userId);
        const followingsIds = currentUser.followings.map((u: any) => u._id.toString());
        const sentIds = RequestsSent.map((u: any) => u.recipient.toString());
        const recievedIds = RequestsRecieved.map((u: any) => u.sender.toString());
        console.log("followingsIds", followingsIds);
        console.log("requestedIds", [sentIds, recievedIds]);
        const excludedUserIds = new Set([userId.toString(), ...followingsIds, ...sentIds, ...recievedIds]);
        console.log("excludedUserIds", excludedUserIds);
        // Find users you’re not following and haven't requested
        const suggestions = await getUsers({
            _id: { $nin: Array.from(excludedUserIds) },
        })
            .select("firstName lastName username avatar email")
            .limit(10);
        console.log("suggestions", suggestions);
        res.json(suggestions).status(200).end();
    } catch (error) {
        res.sendStatus(400);
    }
};
