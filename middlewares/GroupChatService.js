import GroupChat from "../models/GroupChat.js";

// Tạo tin nhắn nhóm mới
export const createGroupChatService = async ({ groupId, senderId, content, mediaUrl, status }) => {
   const newMessage = new GroupChat({ groupId, senderId, content, mediaUrl, status });
   await newMessage.save();
   return newMessage;
};

// Lấy tin nhắn theo groupId (phân trang)
export const getGroupChatsByGroupIdService = async (groupId, page = 1, limit = 10) => {
   const skip = (page - 1) * limit;

   return await GroupChat.find({ groupId: groupId })
      .sort({ sentAt: -1 })  // Sắp xếp theo thời gian gửi
      .skip(skip)  // Bỏ qua số lượng cần thiết để phân trang
      .limit(limit);  // Giới hạn số lượng kết quả
};

// Cập nhật trạng thái tin nhắn (ví dụ: đã đọc)
export const updateGroupChatStatusService = async (groupChatId, status) => {
   const updatedMessage = await GroupChat.findOneAndUpdate(
      { groupChatId: groupChatId },
      { status },
      { new: true }
   );
   return updatedMessage;
};

// Xóa tin nhắn
export const deleteGroupChatService = async (groupChatId) => {
   const deletedMessage = await GroupChat.findOneAndDelete({ groupChatId: groupChatId });
   return deletedMessage;
};
