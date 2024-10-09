import express from "express";
import { getUserDetail, getUserDetailByEmail } from "../controllers/UserController.js";
import { authenticateToken } from "../security/JwtConfig.js";


const UserRouter = express.Router();

UserRouter.get("/:userId", authenticateToken, getUserDetail);
UserRouter.get("/get-detail-user", authenticateToken, getUserDetailByEmail);


export default UserRouter;
