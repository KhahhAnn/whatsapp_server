import { createContactService, deleteContactService, getContactsByUserService, updateContactService } from "../middlewares/ContactService.js";
import { emitContactRequest } from "../websockets/SocketHandler.js";

export const createContact = async (req, res) => {
   const { userId, contactUserId, nickname, status } = req.body;
   
   try {
      // Check if the user is trying to add themselves
      if (userId === contactUserId) {
         return res.status(400).json({ message: "Không thể thêm chính mình vào danh sách liên hệ" });
      }

      // Check if the contact already exists
      const existingContact = await getContactsByUserService(userId);
      const contactExists = existingContact.some(contact => contact.contactUserId === contactUserId);

      if (contactExists) {
         return res.status(400).json({ message: "User đã có liên hệ này rồi" });
      }

      const contact = await createContactService({ userId, contactUserId, nickname, status });
      res.status(201).json({ message: "Tạo liên hệ thành công", contact });
      emitContactRequest(userId, contactUserId, nickname);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi tạo liên hệ", error: err.message });
   }
};


// Cập nhật liên hệ
export const updateContact = async (req, res) => {
   const { contactId } = req.params;
   const updateData = req.body;

   try {
      const updatedContact = await updateContactService(contactId, updateData);
      if (!updatedContact) {
         return res.status(404).json({ message: "Không tìm thấy liên hệ" });
      }
      res.json({ message: "Cập nhật liên hệ thành công", updatedContact });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi cập nhật liên hệ", error: err.message });
   }
};

// Xóa liên hệ
export const deleteContact = async (req, res) => {
   const { contactId } = req.params;

   try {
      const deletedContact = await deleteContactService(contactId);
      if (!deletedContact) {
         return res.status(404).json({ message: "Không tìm thấy liên hệ" });
      }
      res.json({ message: "Xóa liên hệ thành công", deletedContact });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi xóa liên hệ", error: err.message });
   }
};

// Lấy danh sách liên hệ của một người dùng
export const getContactsByUser = async (req, res) => {
   const { userId } = req.params;
   const { page, limit } = req.query;

   try {
      const contacts = await getContactsByUserService(userId, page, limit);
      res.json(contacts);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách liên hệ", error: err.message });
   }
};
