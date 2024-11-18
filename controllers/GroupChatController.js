import { 
   sendGroupMessageService, 
   getGroupMessagesByGroupIdService, 
   updateGroupMessageStatusService, 
   deleteGroupMessageService,
   addGroupMemberService,
   getGroupByUserIdService,
   getAllGroupService,
} from "../middlewares/GroupChatService.js";

import Group from "../models/groups.js";

//API lấy ra tin nhắn theo groupId
export const getGroupMessagesByGroupId = async (req, res) => {
   const { groupId } = req.params;
   const { page, limit } = req.query;

   try {
      const messages = await getGroupMessagesByGroupIdService(groupId, page, limit);
      res.json(messages);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy tin nhắn nhóm", error: err.message });
   }
};

//API lấy ra các group theo userId
export const getGroupByUserId = async (req, res) => {
   const userId = req.params.userId;
   try {
       const groups = await getGroupByUserIdService(userId); // Gọi service để lấy nhóm
       res.status(200).json(groups);
   } catch (error) {
       res.status(500).json({ message: "Lỗi khi lấy danh sách nhóm", error });
   }
};

//API tạo group
export const createGroup = async (req, res) => {
   const { groupName, createdBy } = req.body;

   try {
      const newGroup = new Group({ groupName, createdBy });
      await newGroup.save();

      // Thêm người tạo nhóm vào danh sách thành viên
      await addGroupMemberService({ groupId: newGroup.groupId, userId: createdBy, role: 'admin' });

      res.status(201).json({ message: "Tạo nhóm thành công", newGroup });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi tạo nhóm", error: err.message });
   }
};

//API gửi tin nhắn
export const sendGroupMessage = async (req, res) => {
   const { groupId, senderId, content, mediaUrl, status } = req.body;

   try {
      const message = await sendGroupMessageService({ groupId, senderId, content, mediaUrl, status });
      res.status(201).json({ message: "Tạo tin nhắn thành công", message });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi tạo tin nhắn", error: err.message });
   }
};

// Cập nhật trạng thái tin nhắn
export const updateGroupMessageStatus = async (req, res) => {
   const { groupChatId } = req.params;
   const { status } = req.body;

   try {
      const updatedMessage = await updateGroupMessageStatusService(groupChatId, status);
      if (!updatedMessage) {
         return res.status(404).json({ message: "Không tìm thấy tin nhắn" });
      }
      res.json({ message: "Cập nhật trạng thái thành công", updatedMessage });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi cập nhật trạng thái", error: err.message });
   }
};

// Xóa tin nhắn
export const deleteGroupMessage = async (req, res) => {
   const { groupChatId } = req.params;

   try {
      const deletedMessage = await deleteGroupMessageService(groupChatId);
      if (!deletedMessage) {
         return res.status(404).json({ message: "Không tìm thấy tin nhắn" });
      }
      res.json({ message: "Xóa tin nhắn thành công", deletedMessage });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi xóa tin nhắn", error: err.message });
   }
};

//API lấy ra tất cả các group
export const getAllGroup = async (req, res) => {
   try {
      const groups = await getAllGroupService();
      res.json(groups);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy tất cả các group", error: err.message });
   }
};
