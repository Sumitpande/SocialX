import bodyParser from "body-parser";
import express, { Application } from "express";
// import mongoose, { ConnectOptions } from 'mongoose';
// import config from './config/config';
import router from "./router";

const cors = require("cors");
// const { Server } = require('socket.io');
const RateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
// const xss = require('xss');
// const { createServer } = require('node:http');
const morgan = require("morgan");
const app: Application = express();
// const server = createServer(app);
// const port = process.env.PORT || 8000;
// const mongoURL = `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}/?authSource=admin`;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }),
);
app.use(mongoSanitize());

app.use(express.json({ limit: "10kb" })); // parse json bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/", router());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const limiter = RateLimit({
    max: 3000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP. Please try after 1 hour.",
});

app.use("/public", limiter);
// app.use(xss());

module.exports = app;
