import express from "express";
import { authenticateToken } from "../security/JwtConfig.js";
import { createGroup, createGroupChat, deleteGroupChat, getGroupChatsByGroupId, updateGroupChatStatus, getGroupChatsByUserId } from "../controllers/GroupChatController.js";

const GroupChatRouter = express.Router();

GroupChatRouter.get("/:groupId", authenticateToken, getGroupChatsByGroupId);
GroupChatRouter.get("/group-user/:userId", authenticateToken, getGroupChatsByUserId);
GroupChatRouter.post("/create-group", authenticateToken, createGroup);
GroupChatRouter.post("/", authenticateToken, createGroupChat);
GroupChatRouter.put("/:groupId", authenticateToken, updateGroupChatStatus);
GroupChatRouter.delete("/groupChatId", authenticateToken, deleteGroupChat);
export default GroupChatRouter;
