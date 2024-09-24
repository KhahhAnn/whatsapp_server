import express from "express";
import { authenticateToken } from "../security/JwtConfig.js";
import { createMessage, getMessageDetails, getMessagesByUser } from "../controllers/MessageController.js";

const MessageRouter = express.Router();

// Tạo tin nhắn mới
MessageRouter.post("/create", authenticateToken, createMessage);

// Lấy chi tiết tin nhắn theo messageId
MessageRouter.get("/:messageId", authenticateToken, getMessageDetails);

// Lấy danh sách tin nhắn của một người dùng theo userId
MessageRouter.get("/messages-user/:userId", authenticateToken, getMessagesByUser);

export default MessageRouter;
