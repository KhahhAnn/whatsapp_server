import express from "express";
import { authenticateToken } from "../security/JwtConfig.js";
import { createMessage, getMessageDetails, getMessagesByUser } from "../controllers/MessageController.js";

const MessageRouter = express.Router();

MessageRouter.post("/create", authenticateToken, createMessage);
MessageRouter.get("/:messageId", authenticateToken, getMessageDetails);
MessageRouter.get("/messages-user/:userId", authenticateToken, getMessagesByUser);

export default MessageRouter;
