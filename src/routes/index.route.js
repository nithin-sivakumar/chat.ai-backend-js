import express from "express";
import chatRouter from "./chat.route.js";

const indexRouter = express.Router();

indexRouter.use("/chat", chatRouter);

export default indexRouter;
