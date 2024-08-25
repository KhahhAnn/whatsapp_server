import express from "express";
import { login } from "../controllers/login.js";
import { newUser } from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/login", login);
userRouter.post("/create-user", newUser);


export default userRouter;
