import express from "express";
import { authenticateToken } from "../security/JwtConfig.js";
import { addGroupMember, getGroupMembersByGroupId, removeGroupMember, updateGroupMemberRole } from "../controllers/GroupMemberController.js";

const GroupMemberRouter = express.Router();

// Thêm thành viên vào nhóm
GroupMemberRouter.post("/add-member", authenticateToken, addGroupMember);

// Cập nhật vai trò của thành viên
GroupMemberRouter.put("/member-role/:groupMemberId", authenticateToken, updateGroupMemberRole);

// Xóa thành viên khỏi nhóm
GroupMemberRouter.delete("/member/:groupMemberId", authenticateToken, removeGroupMember);

// Lấy danh sách thành viên của nhóm
GroupMemberRouter.get("/list-member/:groupId", authenticateToken, getGroupMembersByGroupId);

export default GroupMemberRouter;
