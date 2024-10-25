import { Server } from "socket.io";

const setupSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
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

    socket.join(socket.userId)

    const users = [];

    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userId: socket.userId, // Sử dụng userId đã gán
        socketId: id, // Lưu lại socketId để phát tin nhắn tới người dùng đích
      });
    }

    io.emit("getUsersOnline", users);

    // Dùng broadcast để gửi sự kiện userJustConnected tới tất cả người dùng trừ người đã kết nối
    socket.broadcast.emit("userJustConnected", {
      userId: socket.userId,
      socketId: socket.id,
    });

    // Nhận tin nhắn từ người gửi và gửi tin nhắn tới người nhận
    socket.on("privateMessage", ({ message, to }) => {
      console.log("Received message: ", message, to);
      socket.to(to).emit("privateMessageToReceiver", {
        message: message,
        from: socket.userId, // Đổi từ socket.id sang socket.userId
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected: ", socket.handshake.auth);
    });
  });
};

export { setupSocketServer };
