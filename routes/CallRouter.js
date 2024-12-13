import express from "express";
import {
  createCall,
  createCallToken,
  endCall,
  getCallDetails,
  getCallsByUser,
} from "../controllers/CallController.js";
import { authenticateToken } from "../security/JwtConfig.js";

const CallRouter = express.Router();

CallRouter.post("/token", authenticateToken, createCallToken);
CallRouter.post("/call-start", authenticateToken, createCall);
CallRouter.put("/call-end/:callId", authenticateToken, endCall);
CallRouter.get("/:callId", authenticateToken, getCallDetails);
CallRouter.get("/calls-user/:userId", authenticateToken, getCallsByUser);
CallRouter.get("/call-detail/:callId", authenticateToken, getCallDetails);

export default CallRouter;
