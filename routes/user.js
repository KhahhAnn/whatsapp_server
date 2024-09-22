import express from "express";
import { login } from "../controllers/login.js";
import { newGroupMember } from "../middlewares/GroupMemberService.js";
import { getCalls } from "../middlewares/CallService.js";

const userRouter = express.Router();

userRouter.get("/login", login);
userRouter.post("/create-user", newGroupMember);
userRouter.get("/call", getCalls);



export default userRouter;
