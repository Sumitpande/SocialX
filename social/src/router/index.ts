import express from "express";
import authentication from "./authentication";
import messages from "./message.router";
import user from "./user";
import post from "./post.router";
const router = express.Router();

export default (): express.Router => {
    authentication(router);
    user(router);
    messages(router);
    post(router);
    return router;
};
