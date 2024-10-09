import { getUserService } from "../middlewares/UserService.js";

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
      const user = await getUserDetailByEmail(email);
      if (!user) {
         return res.status(404).json({ message: "Không tìm thấy user" });
      }
      res.json(user);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy chi tiết user", error: err.message });
   }
};