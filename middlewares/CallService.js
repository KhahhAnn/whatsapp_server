import { Call } from "../models/Call.js";

// Tạo cuộc gọi mới
export const createCallService = async ({ callerId, receiverId, callType }) => {
   const startTime = new Date();
   const newCall = new Call({ callerId, receiverId, startTime, callType });
   await newCall.save();
   return newCall;
};

// Kết thúc cuộc gọi
export const endCallService = async (callId) => {
   const call = await Call.findOneAndUpdate(
      { callId: callId },
      { endTime: new Date() },
      { new: true }
   );
   return call;
};

// Lấy chi tiết cuộc gọi
export const getCallDetailsService = async (callId) => {
   try {
      return await Call.findOne({ callId: callId });
   } catch (error) {
      throw new Error("Lỗi khi truy vấn dữ liệu: " + error.message);
   }
};


// Lấy danh sách cuộc gọi của một người dùng
export const getCallsByUserService = async (userId, page = 1, limit = 10) => {
   const skip = (page - 1) * limit;

   return await Call.find({
      $or: [{ callerId: userId }, { receiverId: userId }]
   })
      .sort({ startTime: -1 })  // Sắp xếp theo thời gian
      .skip(skip)  // Bỏ qua số lượng cần thiết để phân trang
      .limit(limit);  // Giới hạn số lượng kết quả
};