import express from "express";
import { deleteUser, loginUser, registerUser, updateUser } from "../controllers/AccountController.js";
import { authenticateToken } from "../security/JwtConfig.js";

const AccountRouter = express.Router();

// Các API không yêu cầu token
AccountRouter.post("/register", registerUser);
AccountRouter.post("/login", loginUser);

// Các API yêu cầu token để truy cập
AccountRouter.put("/update", authenticateToken, updateUser);  
AccountRouter.delete("/delete", authenticateToken, deleteUser); 



export default AccountRouter;
