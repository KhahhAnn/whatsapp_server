import express from "express";
import { authenticateToken } from "../security/JwtConfig.js";
import { createMessage, getMessageDetails, getMessagesByUser, getMessagesBetweenUsers, deleteMessage } from "../controllers/MessageController.js";

const MessageRouter = express.Router();

MessageRouter.post("/create", authenticateToken, createMessage);
MessageRouter.get("/:messageId", authenticateToken, getMessageDetails);
MessageRouter.get("/messages-user/:userId", authenticateToken, getMessagesByUser);
MessageRouter.get("/messages-between/:senderId/:receiverId", authenticateToken, getMessagesBetweenUsers);
MessageRouter.delete("/:messageId", authenticateToken, deleteMessage);
export default MessageRouter;
