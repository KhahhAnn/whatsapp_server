import { MessageStatus } from "../models/messageStatus.js";

// Tạo trạng thái tin nhắn mới
export const createMessageStatusService = async ({ messageId, userId, status }) => {
   const updatedAt = new Date();
   const newMessageStatus = new MessageStatus({ messageId, userId, status, updatedAt });
   await newMessageStatus.save();
   return newMessageStatus;
};

// Cập nhật trạng thái tin nhắn
export const updateMessageStatusService = async (messageId, userId, status) => {
   const updatedAt = new Date();
   const updatedMessageStatus = await MessageStatus.findOneAndUpdate(
      { messageId, userId },
      { status, updatedAt },
      { new: true, upsert: true } // Nếu không có sẽ tạo mới
   );
   return updatedMessageStatus;
};

// Lấy trạng thái tin nhắn cho một người dùng
export const getMessageStatusByUserService = async (userId, page = 1, limit = 10) => {
   const skip = (page - 1) * limit;

   return await MessageStatus.find({ userId })
      .sort({ updatedAt: -1 })  // Sắp xếp theo thời gian
      .skip(skip)  // Bỏ qua số lượng cần thiết để phân trang
      .limit(limit);  // Giới hạn số lượng kết quả
};

// Lấy trạng thái của một tin nhắn cụ thể
export const getMessageStatusService = async (messageId, userId) => {
   return await MessageStatus.findOne({ messageId, userId });
};
