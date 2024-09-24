import { 
   addGroupMemberService, 
   updateGroupMemberRoleService, 
   removeGroupMemberService, 
   getGroupMembersByGroupIdService 
} from "../middlewares/GroupMemberService.js";

// Thêm thành viên vào nhóm
export const addGroupMember = async (req, res) => {
   const { groupId, userId, role } = req.body;

   try {
      const member = await addGroupMemberService({ groupId, userId, role });
      res.status(201).json({ message: "Thêm thành viên thành công", member });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi thêm thành viên", error: err.message });
   }
};

// Cập nhật vai trò của thành viên
export const updateGroupMemberRole = async (req, res) => {
   const { groupMemberId } = req.params;
   const { role } = req.body;

   try {
      const updatedMember = await updateGroupMemberRoleService(groupMemberId, role);
      if (!updatedMember) {
         return res.status(404).json({ message: "Không tìm thấy thành viên" });
      }
      res.json({ message: "Cập nhật vai trò thành công", updatedMember });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi cập nhật vai trò", error: err.message });
   }
};

// Xóa thành viên khỏi nhóm
export const removeGroupMember = async (req, res) => {
   const { groupMemberId } = req.params;

   try {
      const deletedMember = await removeGroupMemberService(groupMemberId);
      if (!deletedMember) {
         return res.status(404).json({ message: "Không tìm thấy thành viên" });
      }
      res.json({ message: "Xóa thành viên thành công", deletedMember });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi xóa thành viên", error: err.message });
   }
};

// Lấy danh sách thành viên của nhóm
export const getGroupMembersByGroupId = async (req, res) => {
   const { groupId } = req.params;
   const { page, limit } = req.query;

   try {
      const members = await getGroupMembersByGroupIdService(groupId, page, limit);
      res.json(members);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách thành viên", error: err.message });
   }
};
