import express from "express";
import chatController from "../controllers/chat.controller.js";

const chatRouter = express.Router();

chatRouter.route("/new").post(chatController.new);

chatRouter.route("/:conversation_id/send").post(chatController.send);

chatRouter.route("/:conversation_id/history").get(chatController.history);

export default chatRouter;
