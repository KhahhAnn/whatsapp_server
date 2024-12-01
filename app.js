import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import http from "http";
import AccountRouter from "./routes/AccountRouter.js";
import CallRouter from "./routes/CallRouter.js";
import {
  corsConfig,
  parseCookies,
  // rateLimiter,
  securityHeaders,
} from "./security/SecurityConfig.js";
import cors from "cors"
import { connectDB } from "./utils/features.js";
import ContactRouter from "./routes/ContactRouter.js";
import GroupChatRouter from "./routes/GroupChatRouter.js";
import GroupMemberRouter from "./routes/GroupMemberRouter.js";
import MessageRouter from "./routes/MessageRouter.js";
import MessageStatusRouter from "./routes/MessageStatusRouter.js";
import UserStatusRouter from "./routes/UserStatusRouter.js";
import UserRouter from "./routes/UserRoter.js";
import jwt from 'jsonwebtoken';
import { setupSocketServer } from "./websockets/SocketHandler.js"; // Import SocketHandler

dotenv.config({
  path: "./.env",
});

const app = express();
const serverPort = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Thay đổi '10mb' thành kích thước bạn muốn
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// SECURITY
app.use(securityHeaders);
// app.use(rateLimiter);
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

const API_KEY_SID = process.env.API_KEY_SID;
const API_KEY_SECRET = process.env.API_KEY_SECRET;

app.post("/api/token", (req, res) => {
  const userId = req.body.from;

  const now = Math.floor(Date.now() / 1000);
  
  const payload = {
    jti: API_KEY_SID + "-" + now,
    iss: API_KEY_SID,
    exp: now + 3600,
    userId: userId
  };

  const token = jwt.sign(payload, API_KEY_SECRET, { algorithm: 'HS256' });
  
  res.json({ access_token: token });
});


server.listen(8080, () => {
  console.log(`Server is running on port : 8080`);
});
