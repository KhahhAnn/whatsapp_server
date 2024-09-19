import express from "express";
import { newGroupMember } from "../controllers/GroupMember.js";
import { login } from "../controllers/login.js";
import { getCalls } from "../controllers/CallController.js";

const userRouter = express.Router();

userRouter.get("/login", login);
userRouter.post("/create-user", newGroupMember);
userRouter.get("/call", getCalls);



export default userRouter;
