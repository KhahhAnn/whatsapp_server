import { 
   createGroupChatService, 
   getGroupChatsByGroupIdService, 
   updateGroupChatStatusService, 
   deleteGroupChatService 
} from "../middlewares/GroupChatService.js";

// Tạo tin nhắn nhóm mới
export const createGroupChat = async (req, res) => {
   const { groupId, senderId, content, mediaUrl, status } = req.body;

   try {
      const message = await createGroupChatService({ groupId, senderId, content, mediaUrl, status });
      res.status(201).json({ message: "Tạo tin nhắn thành công", message });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi tạo tin nhắn", error: err.message });
   }
};

// Lấy danh sách tin nhắn theo groupId
export const getGroupChatsByGroupId = async (req, res) => {
   const { groupId } = req.params;
   const { page, limit } = req.query;

   try {
      const messages = await getGroupChatsByGroupIdService(groupId, page, limit);
      res.json(messages);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy tin nhắn nhóm", error: err.message });
   }
};

// Cập nhật trạng thái tin nhắn
export const updateGroupChatStatus = async (req, res) => {
   const { groupChatId } = req.params;
   const { status } = req.body;

   try {
      const updatedMessage = await updateGroupChatStatusService(groupChatId, status);
      if (!updatedMessage) {
         return res.status(404).json({ message: "Không tìm thấy tin nhắn" });
      }
      res.json({ message: "Cập nhật trạng thái thành công", updatedMessage });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi cập nhật trạng thái", error: err.message });
   }
};

// Xóa tin nhắn
export const deleteGroupChat = async (req, res) => {
   const { groupChatId } = req.params;

   try {
      const deletedMessage = await deleteGroupChatService(groupChatId);
      if (!deletedMessage) {
         return res.status(404).json({ message: "Không tìm thấy tin nhắn" });
      }
      res.json({ message: "Xóa tin nhắn thành công", deletedMessage });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi xóa tin nhắn", error: err.message });
   }
};
