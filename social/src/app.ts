import bodyParser from "body-parser";
import express, { Application } from "express";

import router from "./router";

const cors = require("cors");

const RateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

const morgan = require("morgan");
const app: Application = express();

app.use(
    cors({
        origin: /^http:\/\/localhost:\d+$/,
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
app.use(express.static("public"));
// app.use(xss());

module.exports = app;
