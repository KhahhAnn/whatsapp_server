import express from "express";
import { authenticateToken } from "../security/JwtConfig.js";
import { getGroupMessagesByGroupId, getGroupByUserId, createGroup, sendGroupMessage, updateGroupMessageStatus, deleteGroupMessage, deleteGroup, getAllGroup } from "../controllers/GroupChatController.js";

const GroupChatRouter = express.Router();
//API lấy ra tin nhắn theo groupId
GroupChatRouter.get("/messages/:groupId", authenticateToken, getGroupMessagesByGroupId);
//API lấy ra các group theo userId
GroupChatRouter.get("/group-user/:userId", authenticateToken, getGroupByUserId);
//API tạo group
GroupChatRouter.post("/create-group", authenticateToken, createGroup);
//API gửi tin nhắn
GroupChatRouter.post("/send-message", authenticateToken, sendGroupMessage);
//API cập nhật trạng thái tin nhắn
GroupChatRouter.put("/update-status/:groupId", authenticateToken, updateGroupMessageStatus);
//API xoá tin nhắn
GroupChatRouter.delete("/delete-message/:groupChatId", authenticateToken, deleteGroupMessage);
//API lấy ra tất cả các group
GroupChatRouter.get("/all-group", authenticateToken, getAllGroup);
//API xóa group
GroupChatRouter.delete("/delete-group/:groupId", authenticateToken, deleteGroup);
export default GroupChatRouter;
