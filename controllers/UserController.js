import { getUserService, getUserByEmailService, getUserByPhoneNumberService, getAllUsersService } from "../middlewares/UserService.js";

export const getUserDetail = async (req, res) => {
   const { userId } = req.params;

   try {
      const user = await getUserService(userId);
      if (!user) {
         return res.status(404).json({ message: "Không tìm thấy user" });
      }
      res.json(user);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy chi tiết user", error: err.message });
   }
};

export const getUserDetailByEmail = async (req, res) => {
   const { email } = req.body;

   try {
      const user = await getUserByEmailService(email);
      if (!user) {
         return res.status(404).json({ message: "Không tìm thấy user" });
      }
      res.json(user);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy chi tiết user", error: err.message });
   }
};


export const getUserDetailByPhoneNumber = async (req, res) => {
   const { phoneNumber } = req.body;

   try {
      const user = await getUserByPhoneNumberService(phoneNumber);
      if (!user) {
         return res.status(404).json({ message: "Không tìm thấy user" });
      }
      res.json(user);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy chi tiết user", error: err.message });
   }
};

export const getAllUsers = async (req, res) => {
   try {
      const users = await getAllUsersService();
      if (!users || users.length === 0) {
         return res.status(404).json({ message: "Không tìm thấy user nào" });
      }
      res.json(users);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách user", error: err.message });
   }
};