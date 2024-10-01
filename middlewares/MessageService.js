import Message from "../models/message.js";

// Tạo tin nhắn mới
export const createMessageService = async ({ senderId, receiverId, content, mediaUrl }) => {
   const sentAt = new Date();
   const newMessage = new Message({ senderId, receiverId, content, mediaUrl, sentAt });
   await newMessage.save();
   return newMessage;
};

// Lấy chi tiết tin nhắn
export const getMessageDetailsService = async (messageId) => {
   try {
      return await Message.findOne({ messageId: messageId });
   } catch (error) {
      throw new Error("Lỗi khi truy vấn dữ liệu: " + error.message);
   }
};

// Lấy danh sách tin nhắn của một người dùng
export const getMessagesByUserService = async (userId, page = 1, limit = 10) => {
   const skip = (page - 1) * limit;

   return await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }]
   })
      .sort({ sentAt: -1 })  // Sắp xếp theo thời gian
      .skip(skip)  // Bỏ qua số lượng cần thiết để phân trang
      .limit(limit);  // Giới hạn số lượng kết quả
};
