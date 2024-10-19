import express from "express";
import { getAllUsers, getUserDetail, getUserDetailByEmail } from "../controllers/UserController.js";
import { authenticateToken } from "../security/JwtConfig.js";


const UserRouter = express.Router();


UserRouter.get("/get-all", authenticateToken, getAllUsers);
UserRouter.get("/:userId", authenticateToken, getUserDetail);
UserRouter.get("/get-detail-user", authenticateToken, getUserDetailByEmail);


export default UserRouter;
