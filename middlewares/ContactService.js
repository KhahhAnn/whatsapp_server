import Contact from "../models/Contact.js";
// import { getUserByPhoneNumberService } from "./UserService.js";

// Tạo liên hệ mới
export const createContactService = async ({ userId, contactUserId, nickname, status }) => {
   const newContact = new Contact({ userId, contactUserId, nickname, status });
   await newContact.save();
   return newContact;
};

// Cập nhật liên hệ (nickname hoặc status)
export const updateContactService = async (contactId, updateData) => {
   const updatedContact = await Contact.findOneAndUpdate(
      { contactId: contactId },
      updateData,
      { new: true }
   );
   return updatedContact;
};

// Xóa liên hệ
export const deleteContactService = async (contactId) => {
   const deletedContact = await Contact.findOneAndDelete({ contactId: contactId });
   return deletedContact;
};

// Lấy danh sách liên hệ của một người dùng
export const getContactsByUserService = async (userId, page = 1, limit = 10) => {
   const skip = (page - 1) * limit;

   return await Contact.find({ userId: userId })
      .sort({ createdAt: -1 })  // Sắp xếp theo thời gian tạo
      .skip(skip)  // Bỏ qua số lượng cần thiết để phân trang
      .limit(limit);  // Giới hạn số lượng kết quả
};

//Lấy danh sách liên hệ của một người dùng theo contactUserId
export const getContactsByContactUserIdService = async (contactUserId) => {
   return await Contact.find({ contactUserId: contactUserId });
};
