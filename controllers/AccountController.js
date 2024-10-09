import { deleteUserService, loginUserService, registerUserService, updateUserService } from "../middlewares/AccountService.js";

// Đăng ký người dùng
export const registerUser = async (req, res) => {
   if (!req.body) {
      return res.status(400).json({ message: req.body});
   }

   const { username, email, password, phoneNumber } = req.body;

   try {
      const result = await registerUserService({ username, email, password, phoneNumber });
      res.status(201).json({ message: "Đăng ký thành công", userId: result.userId });
   } catch (err) {
      if (err.message === "Email đã được sử dụng") {
         return res.status(400).json({ message: err.message });
      }
      console.error("Lỗi khi đăng ký người dùng:", err);
      res.status(500).json({ message: "Lỗi máy chủ" });
   }
};

// Đăng nhập người dùng
export const loginUser = async (req, res) => {
   const { email, password, rememberMe } = req.body;

   try {
      const result = await loginUserService({ email, password, rememberMe });
      // Lưu refresh token vào cookie
      res.cookie('refreshToken', result.refreshToken, { 
         maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 // 7 ngày hoặc 1 ngày
      });
      res.json({ message: "Đăng nhập thành công", accessToken: result.accessToken, refreshToken: result.refreshToken , user: result.user});

   } catch (err) {
      console.error("Lỗi khi đăng nhập:", err);
      res.status(400).json({ message: err.message });
   }
};


// Cập nhật thông tin người dùng
export const updateUser = async (req, res) => {
   const { userId, phoneNumber, profilePicture } = req.body;

   try {
      const updatedUser = await updateUserService(userId, { phoneNumber, profilePicture });
      res.json({ message: "Cập nhật thành công", updatedUser });
   } catch (err) {
      console.error("Lỗi khi cập nhật thông tin:", err);
      res.status(404).json({ message: err.message });
   }
};

// Xóa tài khoản người dùng
export const deleteUser = async (req, res) => {
   const { userId } = req.body;

   try {
      const result = await deleteUserService(userId);
      res.json(result);
   } catch (err) {
      console.error("Lỗi khi xóa tài khoản:", err);
      res.status(404).json({ message: err.message });
   }
};