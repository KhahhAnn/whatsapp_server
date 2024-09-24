import { createUserStatusService, getUserStatusByUserService, updateUserStatusService, deleteUserStatusService } from "../middlewares/UserStatusService.js";

// Tạo trạng thái mới
export const createUserStatus = async (req, res) => {
   const { userId, statusText, mediaUrl, expiresAt } = req.body;

   try {
      const userStatus = await createUserStatusService({ userId, statusText, mediaUrl, expiresAt });
      res.status(201).json({ message: "Tạo trạng thái thành công", userStatus });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi tạo trạng thái", error: err.message });
   }
};

// Lấy danh sách trạng thái của một người dùng
export const getUserStatusByUser = async (req, res) => {
   const { userId } = req.params;

   try {
      const userStatus = await getUserStatusByUserService(userId);
      res.json(userStatus);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy trạng thái", error: err.message });
   }
};

// Cập nhật trạng thái người dùng
export const updateUserStatus = async (req, res) => {
   const { statusId } = req.params;
   const { statusText, mediaUrl, expiresAt } = req.body;

   try {
      const updatedStatus = await updateUserStatusService(statusId, { statusText, mediaUrl, expiresAt });
      res.json({ message: "Cập nhật trạng thái thành công", updatedStatus });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi cập nhật trạng thái", error: err.message });
   }
};

// Xóa trạng thái người dùng
export const deleteUserStatus = async (req, res) => {
   const { statusId } = req.params;

   try {
      await deleteUserStatusService(statusId);
      res.json({ message: "Xóa trạng thái thành công" });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi xóa trạng thái", error: err.message });
   }
};
