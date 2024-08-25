import express from "express";
import { login } from "../controllers/login.js";

const userRouter = express.Router();

userRouter.get("/login", login);

export default userRouter;
