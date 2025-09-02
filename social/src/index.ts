// import express, { Request, Response, Application } from 'express';
import dotenv from "dotenv";

import mongoose, { ConnectOptions } from "mongoose";
import config from "./config/config";

//For env File
dotenv.config({ path: "./.env" });
import { server } from "./socket/socket";

const port = process.env.PORT || 8000;
const mongoURL = process.env.MONGO_URL || `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}/?authSource=admin`;

const connectWithRetry = () => {
    mongoose.Promise = Promise;
    mongoose
        .connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
        .then(() => console.info("Connected to DB...."))
        .catch((e) => console.info(e));
};
connectWithRetry();

server.listen(port, () => {
    console.info(`Server is Fired at PORT:${port}`);
});

process.on("uncaughtException", (err) => {
    console.log(err);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.log(err);
    server.close(() => {
        process.exit(1);
    });
});
