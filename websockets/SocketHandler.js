import { createMessageService } from "../middlewares/MessageService.js";
import { createMessageStatusService, updateMessageStatusService } from "../middlewares/MessageStatusService.js";
import { verifyToken } from "../security/JwtConfig.js";

const connectedUsers = {};

export const socketHandler = (wss) => {
   wss.on('connection', (ws, req) => {
      // Giả sử bạn đang sử dụng JWT để xác thực
      const token = req.headers['authorization'];  // Token được gửi kèm trong headers

      if (!token) {
         ws.close(1008, 'Unauthorized');  // Đóng kết nối với mã lỗi 1008 (vi phạm chính sách)
         return;
      }

      try {
         // Xác thực token để lấy thông tin người dùng
         const user = verifyToken(token);  // Hàm xác thực JWT và trả về thông tin người dùng
         const userId = user.id;

         console.log(`User ${userId} vừa kết nối đến WebSocket`);


         // Kiểm tra nếu người dùng đã có kết nối trước đó
         if (!connectedUsers[userId]) {
            connectedUsers[userId] = [];
         }

         // Thêm kết nối WebSocket mới vào danh sách
         connectedUsers[userId].push(ws);

         // Xử lý tin nhắn gửi đi
         ws.on('message', async (message) => {
            const parsedMessage = JSON.parse(message);

            if (parsedMessage.type === 'sendMessage') {
               const { senderId, receiverId, content, mediaUrl } = parsedMessage;

               // Lưu tin nhắn vào MongoDB
               const newMessage = await createMessageService({ senderId, receiverId, content, mediaUrl });

               // Lưu trạng thái tin nhắn là 'sent'
               await createMessageStatusService({ messageId: newMessage.messageId, userId: receiverId, status: 'sent' });

               // Kiểm tra người nhận có online không
               const receiverConnections = connectedUsers[receiverId];
               if (receiverConnections) {
                  // Gửi tin nhắn đến tất cả các kết nối của người nhận
                  receiverConnections.forEach((receiverWs) => {
                     receiverWs.send(JSON.stringify({
                        type: 'receiveMessage',
                        message: newMessage
                     }));
                  });

                  // Cập nhật trạng thái tin nhắn là 'delivered'
                  await updateMessageStatusService(newMessage.messageId, receiverId, 'delivered');
               }
            }

            // Xử lý khi người nhận đọc tin nhắn
            if (parsedMessage.type === 'readMessage') {
               const { messageId, userId } = parsedMessage;

               // Cập nhật trạng thái tin nhắn thành 'read'
               await updateMessageStatusService(messageId, userId, 'read');
            }
         });

         // Xử lý khi kết nối đóng lại
         ws.on('close', () => {
            // Xóa kết nối của người dùng khi đóng kết nối
            connectedUsers[userId] = connectedUsers[userId].filter((conn) => conn !== ws);

            // Nếu người dùng không còn kết nối nào, xóa khỏi danh sách
            if (connectedUsers[userId].length === 0) {
               delete connectedUsers[userId];
            }
         });
      } catch (err) {
         ws.close(1008, 'Invalid Token');  // Đóng kết nối nếu xác thực thất bại
         console.error('Token không hợp lệ:', err.message);
      }
   });
};
