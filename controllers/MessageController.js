import { createMessageService, getMessageDetailsService, getMessagesByUserService, getMessagesBetweenUsersService } from "../middlewares/MessageService.js";

// Tạo tin nhắn mới
export const createMessage = async (req, res) => {
   const { senderId, receiverId, content, mediaUrl } = req.body;
   
   try {
      const message = await createMessageService({ senderId, receiverId, content, mediaUrl });
      res.status(201).json({ message: "Tạo tin nhắn thành công", messageData: message });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi tạo tin nhắn", error: err.message });
   }
};

// Lấy chi tiết tin nhắn
export const getMessageDetails = async (req, res) => {
   const { messageId } = req.params;

   try {
      const message = await getMessageDetailsService(messageId);
      if (!message) {
         return res.status(404).json({ message: "Không tìm thấy tin nhắn" });
      }
      res.json(message);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy chi tiết tin nhắn", error: err.message });
   }
};

// Lấy danh sách tin nhắn của một người dùng
export const getMessagesByUser = async (req, res) => {
   const { userId } = req.params;

   try {
      const messages = await getMessagesByUserService(userId);
      res.json(messages);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách tin nhắn", error: err.message });
   }
};

// Lấy danh sách tin nhắn giữa hai người dùng
export const getMessagesBetweenUsers = async (req, res) => {
   const { senderId, receiverId } = req.params;
 
   try {
     const messages = await getMessagesBetweenUsersService(senderId, receiverId);
     res.json(messages);
   } catch (err) {
     res.status(500).json({ message: "Lỗi khi lấy danh sách tin nhắn", error: err.message });
   }
 };
