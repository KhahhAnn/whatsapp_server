import express from "express";
import { authenticateToken } from "../security/JwtConfig.js";
import { createUserStatus, getUserStatusByUser, updateUserStatus, deleteUserStatus } from "../controllers/UserStatusController.js";

const UserStatusRouter = express.Router();

// Tạo trạng thái mới cho người dùng
UserStatusRouter.post("/create", authenticateToken, createUserStatus);

// Lấy danh sách trạng thái của một người dùng
UserStatusRouter.get("/statuses-user/:userId", authenticateToken, getUserStatusByUser);

// Cập nhật trạng thái người dùng
UserStatusRouter.put("/update/:statusId", authenticateToken, updateUserStatus);

// Xóa trạng thái người dùng
UserStatusRouter.delete("/delete/:statusId", authenticateToken, deleteUserStatus);

export default UserStatusRouter;
