import express from "express";
import { authenticateToken } from "../security/JwtConfig.js";
import { createGroupChat, deleteGroupChat, getGroupChatsByGroupId, updateGroupChatStatus } from "../controllers/GroupChatController.js";

const GroupChatRouter = express.Router();

GroupChatRouter.post("/", authenticateToken, createGroupChat);
GroupChatRouter.get("/:groupId", authenticateToken, getGroupChatsByGroupId);
GroupChatRouter.put("/:groupId", authenticateToken, updateGroupChatStatus);
GroupChatRouter.delete("/groupChatId", authenticateToken, deleteGroupChat);

export default GroupChatRouter;
