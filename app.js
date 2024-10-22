import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
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
const io = new Server(server, {
  cors: {
    origin: "*", // Thay đổi thành nguồn mà bạn muốn cho phép
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Nếu bạn cần gửi cookie
  },
});
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.handshake.auth);

  // Lắng nghe sự kiện gửi tin nhắn
  socket.on("sendMessage", (message, next) => {
    // Phát lại tin nhắn cho tất cả client
    console.log("Message: " + message);
    io.emit("receiveMessage", message);

    const userId = socket.handshake.auth.userId;
    if (!userId) {
      return next(new Error("Authentication error"));
    }

    socket.userId = userId;

    next();
  });

  socket.on("sendPrivateMessage", (data) => {
    socket.to(data.to).emit("receivePrivateMessage", data.message);
    console.log("Message: ", data.to, data.message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

server.listen(8080, () => {
  console.log(`Server is running on port : 8080`);
});
