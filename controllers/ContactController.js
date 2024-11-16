import {
  createContactService,
  deleteContactService,
  getContactsByUserService,
  updateContactService,
} from "../middlewares/ContactService.js";
import { emitContactRequest } from "../websockets/SocketHandler.js";

export const createContact = async (req, res) => {
  const { userId, contactUserId, nickname, status } = req.body;

  try {
    if (userId === contactUserId) {
      return res
        .status(400)
        .json({ message: "Không thể thêm chính mình vào danh sách liên hệ" });
    }

    const existingContact = await getContactsByUserService(userId);
    const contactExists = existingContact.some(
      (contact) => contact.contactUserId === contactUserId
    );

    if (contactExists) {
      return res.status(400).json({ message: "User đã có liên hệ này rồi" });
    }

    // Phát sự kiện lời mời thêm liên hệ
    emitContactRequest(userId, contactUserId, nickname);
    console.log("Contact request emitted: ", {
      userId,
      contactUserId,
      nickname,
    });
    res.status(200).json({ message: "Lời mời đã được gửi" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi gửi lời mời", error: err.message });
  }
};

export const acceptContactRequest = async (req, res) => {
  const { userId, contactUserId, nickname, status } = req.body;

  try {
    // Kiểm tra xem liên hệ đã tồn tại hay chưa
    const existingContacts = await getContactsByUserService(userId);
    const contactExists = existingContacts.some(
      (contact) => contact.contactUserId === contactUserId
    );

    if (contactExists) {
      return res
        .status(400)
        .json({ message: "Liên hệ đã tồn tại giữa hai người dùng này." });
    }

    // Thêm user B vào danh sách liên hệ của user A
    const contactA = await createContactService({
      userId,
      contactUserId,
      nickname,
      status,
    });
    // Thêm user A vào danh sách liên hệ của user B
    const contactB = await createContactService({
      userId: contactUserId,
      contactUserId: userId,
      nickname,
      status,
    });
    emitContactRequest(userId, contactUserId, nickname);
    res
      .status(201)
      .json({
        message: "Tạo liên hệ thành công",
        contacts: [contactA, contactB],
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi tạo liên hệ", error: err.message });
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
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật liên hệ", error: err.message });
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
    res
      .status(500)
      .json({ message: "Lỗi khi xóa liên hệ", error: err.message });
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
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách liên hệ", error: err.message });
  }
};
