import { NextFunction, Request, Response } from "express";
import * as _ from "lodash";
import { getUserById, getUserBySessionToken } from "../models/UserActions";

const jwt = require("jsonwebtoken");
const SECRET_KEY = "social";

export interface IRequest extends Request {
    userId: string;
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies["SOCIAL_AUTH"];
        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const user = await getUserBySessionToken(sessionToken);
        if (!user) {
            return res.sendStatus(403);
        }

        _.merge(req, { identity: user });

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.header('Authorization');
    // if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        // const decoded = jwt.verify(token, SECRET_KEY);
        // console.log('decode', decoded);
        // req.body = decoded;
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            return res.status(401).json({
                message: "Access denied.",
            });
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        try {
            const user = await getUserById(decoded.userId);
            if (!user) {
                return res.status(401).json({
                    message: "The user belonging to this token does no longer exists.",
                });
            }
            req.userId = user._id;
            next();
        } catch (error) {
            console.log("error", error);
        }
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
