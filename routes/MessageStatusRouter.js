import express from "express";
import { authenticateToken } from "../security/JwtConfig.js";
import { createMessage, getMessageDetails, getMessagesByUser } from "../controllers/MessageController.js";

const MessageStatusRouter = express.Router();

// Tạo tin nhắn mới
MessageStatusRouter.post("/create", authenticateToken, createMessage);

// Lấy chi tiết tin nhắn theo messageId
MessageStatusRouter.get("/:messageId", authenticateToken, getMessageDetails);

// Lấy danh sách tin nhắn của một người dùng theo userId
MessageStatusRouter.get("/messages-user/:userId", authenticateToken, getMessagesByUser);

export default MessageStatusRouter;
