require("dotenv").config();
import express, { NextFunction, Request, Response} from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { error } from "console";
import {ErrorMiddleware} from "./middleware/error";

// Body Parser
app.use(express.json({limit: "50mb"}));


// Cookie Parser
app.use(cookieParser());

// Cors => Cross origin resource sharing
app.use(cors({
    origin: process.env.ORIGIN,
}));

//Testing API
app.get("/test", (req:Request, res:Response, next:NextFunction) => {
    res.status(200).json({
        success:true,
        message: "API is working",
    })
});

// Unknown Route
app.all("*", (req:Request, res:Response, next:NextFunction) => {
    const err = new error('route ${req.originalUrl} not found.')
    err.statusCode= 404;
    next(err);
});

app.use(ErrorMiddleware);