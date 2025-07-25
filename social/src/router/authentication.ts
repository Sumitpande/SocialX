import express from "express";
import { login, logout, refresh, register } from "../controllers/authentication";
// import { getFollowers } from '../controllers/users';
// import { verifyToken } from '../middlewares';

export default (router: express.Router) => {
    router.post("/auth/register", register);
    router.post("/auth/refresh", refresh);
    router.post("/auth/login", login);
    router.post("/auth/logout", logout);
};
