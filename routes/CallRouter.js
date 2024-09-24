import express from "express";
import { createCall, endCall, getCallDetails, getCallsByUser } from "../controllers/CallController.js";
import { authenticateToken } from "../security/JwtConfig.js";

const CallRouter = express.Router();

CallRouter.post("/call", authenticateToken, createCall);
CallRouter.put("/:callId/end", authenticateToken, endCall);
CallRouter.get("/:callId", authenticateToken, getCallDetails);
CallRouter.get("/calls-user/:userId", authenticateToken, getCallsByUser);

export default CallRouter;
