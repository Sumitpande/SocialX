import { Request, Response } from "express";
import { createUser, getUserByEmail, updateUserByEmail } from "../models/UserActions";
import { authentication, genSalt, isUserAuthenticated } from "../helpers/helper";
import { IUser } from "../models/User";

const jwt = require("jsonwebtoken");

const createAccessToken = (user: IUser) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

const createRefreshToken = (user: IUser) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.info("logging in");
        if (!email || !password) {
            return res.status(400).json({
                error: "Both email and password required.",
            });
        }

        const user: any = await getUserByEmail(email).select("+authentication.salt +authentication.password");

        if (!user) {
            return res.status(400).json({ error: "Email not found." });
        }
        const isAuthenticated = await isUserAuthenticated(password, user.authentication.password);

        if (!isAuthenticated) {
            return res.send(403).json({ error: "Password is incorrect." });
        }

        const salt = await genSalt();
        const token = await authentication(user._id.toString(), salt);
        user.authentication.sessionToken = token;
        const jwtToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);
        await user.save();
        res.cookie("access_token", jwtToken, {
            maxAge: 15 * 60 * 1000, // MS
            httpOnly: true, // prevent XSS attacks cross-site scripting attacks
            sameSite: "strict", // CSRF attacks cross-site request forgery attacks
            secure: process.env.NODE_ENV !== "development",
        });
        res.cookie("refresh_token", refreshToken, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // MS
            httpOnly: true, // prevent XSS attacks cross-site scripting attacks
            sameSite: "strict", // CSRF attacks cross-site request forgery attacks
            secure: process.env.NODE_ENV !== "development",
        });

        return res.status(200).json({
            message: "Logged in Successfully.",
        });
    } catch (error) {
        console.info(error);
        return res.send(400).json({ error: error });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, username, gender, email, password } = req.body;

        if (!email || !password || !firstName || !lastName || !username || !gender) {
            return res.sendStatus(400);
        }
        let user;
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const avatar = gender == "female" ? girlProfilePic : boyProfilePic;

        const existingUser = await getUserByEmail(email);
        const salt = await genSalt();
        const hashPassword = await authentication(password, salt);

        if (existingUser && existingUser.verified) {
            return res.sendStatus(400);
        } else if (existingUser && !existingUser.verified) {
            user = await updateUserByEmail(existingUser.email, {
                firstName,
                lastName,
                username,
                gender,
                avatar,
                authentication: {
                    salt: salt,
                    password: hashPassword,
                },
            });
        } else {
            user = await createUser({
                firstName,
                lastName,
                email,
                username,
                avatar,
                gender,
                authentication: {
                    salt: salt,
                    password: hashPassword,
                },
            });
        }

        return res.status(200).json(user).end();
    } catch (error) {
        console.info(error);
        return res.sendStatus(400);
    }
};

export const logout = (req: Request, res: Response) => {
    try {
        res.clearCookie("access_token").clearCookie("refresh_token");
        res.status(204).json({ message: "Logged out successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
};

export const refresh = (req: Request, res: Response) => {
    const token = req.cookies.refresh_token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = createAccessToken(user);
        res.cookie("access_token", accessToken, {
            httpOnly: true, // prevent XSS attacks cross-site scripting attacks
            sameSite: "strict", // CSRF attacks cross-site request forgery attacks
            secure: process.env.NODE_ENV !== "development",
            maxAge: 15 * 60 * 1000,
        }).sendStatus(200);
    });
};
