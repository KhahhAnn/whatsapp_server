import express from "express";
import { getAllUsers, getUserDetail, getUserDetailByEmail, getUserDetailByPhoneNumber } from "../controllers/UserController.js";
import { authenticateToken } from "../security/JwtConfig.js";


const UserRouter = express.Router();


UserRouter.get("/get-all", getAllUsers);
UserRouter.get("/:userId", authenticateToken, getUserDetail);
UserRouter.get("/get-detail-user", authenticateToken, getUserDetailByEmail);
UserRouter.get("/", authenticateToken, getUserDetailByPhoneNumber);


export default UserRouter;
