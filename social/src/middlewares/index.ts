import { NextFunction, Request, Response } from "express";
import * as _ from "lodash";
import { getUserById } from "../models/UserActions";

import jwt, { TokenExpiredError } from "jsonwebtoken";

import multer from "multer";
const { v4: uuidv4 } = require("uuid");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp/uploads");
    },
    filename: function (req, file, cb) {
        const random = uuidv4();
        cb(null, random + "" + file.originalname);
    },
});

export const upload = multer({
    storage,
});

export interface IRequest extends Request {
    userId: string;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }
        const user = await getUserById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        _.merge(req, { userId: user._id });

        return next();
    } catch (error) {
        console.log("error in verify token:", error);
        if (error instanceof TokenExpiredError) {
            console.log("JWT expired");
            res.clearCookie("token");
            res.status(401).json({ message: (error as Error).message });
        } else {
            console.log("JWT invalid:", (error as Error).message);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

// export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
//     // const token = req.header('Authorization');
//     // if (!token) return res.status(401).json({ error: 'Access denied' });
//     try {
//         // const decoded = jwt.verify(token, SECRET_KEY);
//         // console.log('decode', decoded);
//         // req.body = decoded;
//         let token;
//         if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//             token = req.headers.authorization.split(" ")[1];
//         } else if (req.cookies.jwt) {
//             token = req.cookies.jwt;
//         }
//         if (!token) {
//             return res.status(401).json({
//                 message: "Access denied.",
//             });
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         try {
//             const user = await getUserById(decoded.userId);
//             if (!user) {
//                 return res.status(401).json({
//                     message: "The user belonging to this token does no longer exists.",
//                 });
//             }
//             req.userId = decoded.userId;

//             next();
//         } catch (error) {
//             console.log("error", error);
//         }
//     } catch (error) {
//         res.status(401).json({ error: "Invalid token" });
//     }
// };
