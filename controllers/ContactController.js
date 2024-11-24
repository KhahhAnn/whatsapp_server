import {
  createContactService,
  deleteContactService,
  getContactsByUserService,
  getContactsByContactUserIdService,
  updateContactService,
} from "../middlewares/ContactService.js";
import { emitContactRequest } from "../websockets/SocketHandler.js";
import Contact from "../models/contact.js";

export const createContact = async (req, res) => {
  const { userId, contactUserId, nickname, senderNickname } = req.body;

  try {
    if (userId === contactUserId) {
      return res
        .status(400)
        .json({ message: "Không thể thêm chính mình vào danh sách liên hệ" });
    }

    // Kiểm tra xem đã có lời mời nào chưa
    const existingRequest = await Contact.findOne({
      userId: userId,
      contactUserId: contactUserId,
      status: "pending",
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Đã gửi lời mời đến người dùng này." });
    }

    // Tạo một lời mời mới với nickname của contact A và người gửi lời mời
    const newContactRequest = new Contact({
      userId,
      contactUserId,
      nickname: nickname, // nickname của contact A
      senderNickname: senderNickname, // nickname của người gửi lời mời
      status: "pending",
    });

    await newContactRequest.save();
    //Log ra nickname của contact A và người gửi lời mời
    console.log(
      "Nickname của người nhận lời mời: ",
      nickname,
      "Nickname của người gửi lời mời: ",
      senderNickname
    );

    // Phát sự kiện lời mời thêm liên hệ với cả nickname của contact A và người gửi lời mời
    emitContactRequest(userId, contactUserId, nickname, senderNickname);
    res.status(200).json({ message: "Lời mời đã được gửi" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi gửi lời mời", error: err.message });
  }
};

export const acceptContactRequest = async (req, res) => {
  const { userId, contactUserId, senderNickname } = req.body;

  try {
    // Tìm và xóa lời mời
    const deletedRequest = await Contact.findOneAndDelete(
      {
        userId: contactUserId,
        contactUserId: userId,
        senderNickname: senderNickname,
        status: "pending",
      }
    );

    if (!deletedRequest) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy lời mời để chấp nhận" });
    }

    const receiverNickname = deletedRequest.nickname;

    // Tạo liên hệ cho contact A với nickname của người gửi lời mời
    const contactA = new Contact({
      userId,
      contactUserId,
      nickname: senderNickname,
      status: "accepted",
    });
    // Tạo liên hệ cho contact B với nickname của người nhận lời mời
    const contactB = new Contact({
      userId: contactUserId,
      contactUserId: userId,
      nickname: receiverNickname,
      status: "accepted",
    });

    await contactA.save();
    await contactB.save();

    res
      .status(200)
      .json({
        message: "Chấp nhận lời mời thành công",
        contacts: [contactA, contactB],
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi chấp nhận lời mời", error: err.message });
  }
};

// Cần chỉnh sửa lại khi reject sẽ xoá liên hệ thay vì thay đổi trạng thái reject
export const rejectContactRequest = async (req, res) => {
  const { userId, contactUserId } = req.body;

  try {
    // Cập nhật trạng thái của lời mời
    const updatedContact = await Contact.findOneAndUpdate(
      { userId: contactUserId, contactUserId: userId, status: "pending" },
      { status: "rejected" },
      { new: true }
    );

    if (!updatedContact) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy lời mời để từ chối" });
    }

    res.status(200).json({ message: "Đã từ chối lời mời thành công" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi từ chối lời mời", error: err.message });
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

// Lấy danh sách liên hệ của một người dùng theo contactUserId
export const getContactsByContactUserId = async (req, res) => {
  const { contactUserId } = req.params;
  const contacts = await getContactsByContactUserIdService(contactUserId);
  res.json(contacts);
};

export const getPendingContacts = async (req, res) => {
  const { contactUserId } = req.params;

  try {
    const pendingContacts = await Contact.find({
      contactUserId: contactUserId,
      status: "pending"
    });

    res.status(200).json(pendingContacts);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách liên hệ", error: err.message });
  }
};