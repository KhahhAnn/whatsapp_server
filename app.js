import dotenv from "dotenv";
import express from "express";
import http from "http";
import AccountRouter from "./routes/AccountRouter.js";
import CallRouter from "./routes/CallRouter.js";
import {
  corsConfig,
  parseCookies,
  rateLimiter,
  securityHeaders,
} from "./security/SecurityConfig.js";
import { connectDB } from "./utils/features.js";
import ContactRouter from "./routes/ContactRouter.js";
import GroupChatRouter from "./routes/GroupChatController.js";
import GroupMemberRouter from "./routes/GroupMemberRouter.js";
import MessageRouter from "./routes/MessageRouter.js";
import MessageStatusRouter from "./routes/MessageStatusRouter.js";
import UserStatusRouter from "./routes/UserStatusRouter.js";
import UserRouter from "./routes/UserRoter.js";
import { setupSocketServer } from "./websockets/SocketHandler.js"; // Import SocketHandler

dotenv.config({
  path: "./.env",
});

const app = express();
const serverPort = process.env.PORT || 3000;

// SECURITY
app.use(securityHeaders);
app.use(rateLimiter);
app.use(corsConfig);
app.use(parseCookies);
app.use(express.json());

// API ROOT
app.use("/api/user-status", UserStatusRouter);
app.use("/api/message-status", MessageStatusRouter);
app.use("/api/message", MessageRouter);
app.use("/api/group-member", GroupMemberRouter);
app.use("/api/group-chat", GroupChatRouter);
app.use("/api/contact", ContactRouter);
app.use("/api/account", AccountRouter);
app.use("/api/call", CallRouter);
app.use("/api/user", UserRouter);

// CONNECT DB
const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);

// Tạo server HTTP
const server = http.createServer(app);

// Thiết lập Socket.IO
setupSocketServer(server); // Gọi hàm thiết lập socket server

server.listen(8080, () => {
  console.log(`Server is running on port : 8080`);
});
