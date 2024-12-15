import { Server } from "socket.io";

let io; // Định nghĩa biến io ở đây
const userSockets = new Map(); // Lưu trữ mối quan hệ giữa userId và socketId

const setupSocketServer = (server) => {
  io = new Server(server, {
    cors: {
      origin: "https://whatsapp-server-lemon.vercel.app",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) {
      return next(new Error("Authentication error"));
    }
    socket.userId = userId;
    next();
  });

  io.on("connection", (socket) => {
    console.log("A user connected: ", socket.handshake.auth);
    userSockets.set(socket.userId, socket.id); // Lưu userID và socketID vào Map
    socket.join(socket.userId);

    const users = [];

    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userId: socket.userId,
        socketId: id,
      });
    }

    io.emit("getUsersOnline", users);
    io.emit("userStatusUpdate", { userId: socket.userId, isOnline: true });

    socket.broadcast.emit("userJustConnected", {
      userId: socket.userId,
      socketId: socket.id,
    });

    socket.on("privateMessage", ({ message, to }) => {
      console.log("Received message: ", message, to);
      if (
        message.startsWith("data:image/") ||
        message.startsWith("data:video/")
      ) {
        console.log("Sending image/video message");
      }
      socket.to(to).emit("privateMessageToReceiver", {
        message: message,
        from: socket.userId,
      });
    });

    socket.on("privateCall", ({ from, to, callId }) => {
      console.log("Received call: ", { from, to, callId });
      socket.to(to).emit("privateCallToReceiver", {
        from: socket.userId,
        callId,
      });
    });

    socket.on("joinGroup", (groupId) => {
      socket.join(groupId);
      console.log(`User ${socket.userId} joined group ${groupId}`);
    });

    socket.on("groupMessage", ({ groupId, message }) => {
      console.log(`Received group message: ${message} for group ${groupId}`);
      io.to(groupId).emit("groupMessageToMembers", {
        message,
        from: socket.userId,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected: ", socket.handshake.auth);
      userSockets.delete(socket.userId); // Xóa từ Map khi người dùng ngắt kết nối
      io.emit("userStatusUpdate", { userId: socket.userId, isOnline: false });
    });
  });
};

// Hàm để phát sự kiện contactRequest
const emitContactRequest = (from, to, nickname) => {
  const receiverSocketId = userSockets.get(to);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("contactRequest", { from, to, nickname });
  }
};

export { setupSocketServer, emitContactRequest };
