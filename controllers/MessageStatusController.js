import { createMessageStatusService, updateMessageStatusService, getMessageStatusByUserService, getMessageStatusService } from "../middlewares/MessageStatusService.js";

// Tạo trạng thái tin nhắn mới
export const createMessageStatus = async (req, res) => {
   const { messageId, userId, status } = req.body;

   try {
      const messageStatus = await createMessageStatusService({ messageId, userId, status });
      res.status(201).json({ message: "Tạo trạng thái tin nhắn thành công", messageStatus });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi tạo trạng thái tin nhắn", error: err.message });
   }
};

// Cập nhật trạng thái tin nhắn
export const updateMessageStatus = async (req, res) => {
   const { messageId, userId, status } = req.body;

   try {
      const messageStatus = await updateMessageStatusService(messageId, userId, status);
      res.json({ message: "Cập nhật trạng thái tin nhắn thành công", messageStatus });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi cập nhật trạng thái tin nhắn", error: err.message });
   }
};

// Lấy danh sách trạng thái tin nhắn của một người dùng
export const getMessageStatusByUser = async (req, res) => {
   const { userId } = req.params;

   try {
      const messageStatuses = await getMessageStatusByUserService(userId);
      res.json(messageStatuses);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách trạng thái tin nhắn", error: err.message });
   }
};

// Lấy trạng thái của một tin nhắn cụ thể
export const getMessageStatus = async (req, res) => {
   const { messageId, userId } = req.params;

   try {
      const messageStatus = await getMessageStatusService(messageId, userId);
      if (!messageStatus) {
         return res.status(404).json({ message: "Không tìm thấy trạng thái tin nhắn" });
      }
      res.json(messageStatus);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy trạng thái tin nhắn", error: err.message });
   }
};
