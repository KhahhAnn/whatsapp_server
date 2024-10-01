import { createMessageService } from "../middlewares/MessageService.js";
import { createMessageStatusService, updateMessageStatusService } from "../middlewares/MessageStatusService.js";

const connectedUsers = {};

export const socketHandler = (wss) => {
   wss.on('connection', (ws, req) => {
      const userId = req.user.id;  // Giả sử bạn đã có cơ chế xác thực userId từ token hoặc cookie

      // Kiểm tra nếu người dùng đã có kết nối trước đó
      if (!connectedUsers[userId]) {
         connectedUsers[userId] = [];
      }

      // Thêm kết nối WebSocket mới vào danh sách
      connectedUsers[userId].push(ws);

      // Xử lý tin nhắn gửi đi
      ws.on('message', async (message) => {
         const parsedMessage = JSON.parse(message);

         // Xử lý khi gửi tin nhắn
         if (parsedMessage.type === 'sendMessage') {
            const { senderId, receiverId, content, mediaUrl } = parsedMessage;

            // Lưu tin nhắn vào MongoDB
            const newMessage = await createMessageService({ senderId, receiverId, content, mediaUrl });

            // Lưu trạng thái tin nhắn là 'sent'
            await createMessageStatusService({ messageId: newMessage.messageId, userId: receiverId, status: 'sent' });

            // Kiểm tra người nhận có online hay không
            const receiverConnections = connectedUsers[receiverId];
            if (receiverConnections) {
               // Gửi tin nhắn đến tất cả các kết nối của người nhận (nếu họ có nhiều thiết bị hoặc tab)
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

         // Khi người nhận đọc tin nhắn
         if (parsedMessage.type === 'readMessage') {
            const { messageId, userId } = parsedMessage;

            // Cập nhật trạng thái là 'read'
            await updateMessageStatusService(messageId, userId, 'read');
         }
      });

      // Xử lý khi kết nối đóng lại
      ws.on('close', () => {
         // Xóa kết nối của người dùng khi họ đóng kết nối
         connectedUsers[userId] = connectedUsers[userId].filter((conn) => conn !== ws);

         // Nếu người dùng không còn kết nối nào thì xóa hoàn toàn
         if (connectedUsers[userId].length === 0) {
            delete connectedUsers[userId];
         }
      });
   });
};
