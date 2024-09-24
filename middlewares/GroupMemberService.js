import GroupMember from "../models/groupMember.js";

// Thêm thành viên vào nhóm
export const addGroupMemberService = async ({ groupId, userId, role }) => {
   const newGroupMember = new GroupMember({ groupId, userId, role });
   await newGroupMember.save();
   return newGroupMember;
};

// Cập nhật vai trò thành viên trong nhóm
export const updateGroupMemberRoleService = async (groupMemberId, role) => {
   const updatedMember = await GroupMember.findOneAndUpdate(
      { groupMemberId },
      { role },
      { new: true }
   );
   return updatedMember;
};

// Xóa thành viên khỏi nhóm
export const removeGroupMemberService = async (groupMemberId) => {
   const deletedMember = await GroupMember.findOneAndDelete({ groupMemberId });
   return deletedMember;
};

// Lấy danh sách thành viên của nhóm
export const getGroupMembersByGroupIdService = async (groupId, page = 1, limit = 10) => {
   const skip = (page - 1) * limit;

   return await GroupMember.find({ groupId })
      .sort({ joinedAt: -1 })  // Sắp xếp theo thời gian tham gia
      .skip(skip)  // Bỏ qua số lượng cần thiết để phân trang
      .limit(limit);  // Giới hạn số lượng kết quả
};
