import GroupChat from "../models/GroupChat.js";
import GroupMember from "../models/groupMember.js";
import Group from "../models/groups.js";

// Lấy tin nhắn theo groupId (phân trang)
export const getGroupMessagesByGroupIdService = async (groupId, page = 1, limit = 10) => {
   const skip = (page - 1) * limit;

   return await GroupChat.find({ groupId: groupId })
      .sort({ sentAt: -1 })  // Sắp xếp theo thời gian gửi
      .skip(skip)  // Bỏ qua số lượng cần thiết để phân trang
      .limit(limit);  // Giới hạn số lượng kết quả
};

// Thêm thành viên vào nhóm
export const addGroupMemberService = async ({ groupId, userId, role }) => {
   const newMember = new GroupMember({ groupId, userId, role });
   await newMember.save();
   return newMember;
};

//Lấy ra các group với userId là thành viên
export const getGroupByUserIdService = async (userId) => {
   //Tìm tất cả các groupId mà userId là thành viên
   const groupMembers = await GroupMember.find({ userId });
   //Lấy ra các groupId từ các thành viên
   const groupIds = groupMembers.map(member => member.groupId);
   //Lấy tất cả group chat cho các groupId này
   return await Group.find({ groupId: { $in: groupIds } }).populate('groupId');
};

// Tạo tin nhắn nhóm mới
export const sendGroupMessageService = async ({ groupId, senderId, content, mediaUrl, status }) => {
   const newMessage = new GroupChat({ groupId, senderId, content, mediaUrl, status });
   await newMessage.save();
   return newMessage;
};

// Cập nhật trạng thái tin nhắn (ví dụ: đã đọc)
export const updateGroupMessageStatusService = async (groupChatId, status) => {
   const updatedMessage = await GroupChat.findOneAndUpdate(
      { groupChatId: groupChatId },
      { status },
      { new: true }
   );
   return updatedMessage;
};

// Xóa tin nhắn
export const deleteGroupMessageService = async (groupChatId) => {
   const deletedMessage = await GroupChat.findOneAndDelete({ groupChatId: groupChatId });
   return deletedMessage;
};

// Xóa group
export const deleteGroupService = async (groupId) => {
   const deletedGroup = await Group.findOneAndDelete({ groupId: groupId });
   return deletedGroup;
};

// Lấy ra tất cả các group
export const getAllGroupService = async () => {
   return await Group.find();
};