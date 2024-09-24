import { UserStatus } from "../models/UserStatus.js";

// Tạo trạng thái mới cho người dùng
export const createUserStatusService = async ({ userId, statusText, mediaUrl, expiresAt }) => {
   const createdAt = new Date();
   const newUserStatus = new UserStatus({ userId, statusText, mediaUrl, createdAt, expiresAt });
   await newUserStatus.save();
   return newUserStatus;
};

// Lấy danh sách trạng thái của người dùng
export const getUserStatusByUserService = async (userId) => {
   return await UserStatus.find({ userId })
      .sort({ createdAt: -1 });
};

// Cập nhật trạng thái người dùng
export const updateUserStatusService = async (statusId, { statusText, mediaUrl, expiresAt }) => {
   const updatedStatus = await UserStatus.findOneAndUpdate(
      { statusId },
      { statusText, mediaUrl, expiresAt },
      { new: true }
   );
   return updatedStatus;
};

// Xóa trạng thái người dùng
export const deleteUserStatusService = async (statusId) => {
   await UserStatus.deleteOne({ statusId });
};
