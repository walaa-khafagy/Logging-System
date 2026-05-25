import express from "express";
import mongoose from "mongoose";

import developersRouter from "./developers/developers.router.js";
//import applicationsRouter from "./applications/applications.router.js";
//import logsRouter from "./logs/logs.router.js";

//import errorMiddleware from "./middlewares/error.middleware.js";


const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());


server.use("/api/developers", developersRouter);
//server.use("/api/applications", applicationsRouter);
//server.use("/api/logs", logsRouter);

//server.use(errorMiddleware);


try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to database...");
    server.listen(process.env.PORT_NUMBER || 5000, () => {
        console.log(`Server running on port ${process.env.PORT_NUMBER || 5000}`);
    });
} catch (error) {
    console.error(error);
    process.exit();
}

