import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../security/JwtConfig.js";


export const registerUserService = async ({ username, email, password, phoneNumber }) => {
   const existingUser = await User.findOne({ email });
   if (existingUser) {
      throw new Error("Email đã được sử dụng");
   }

   const passwordHash = await bcrypt.hash(password, 10);
   const newUser = new User({
      username,
      email,
      passwordHash,
      phoneNumber
   });

   await newUser.save();

   const accessToken = generateAccessToken(newUser.userId);
   const refreshToken = generateRefreshToken(newUser.userId);

   return { 
      userId: newUser.userId,
      accessToken,
      refreshToken
   };
};


export const loginUserService = async ({ email, password, rememberMe }) => {
   const user = await User.findOne({ email }).select("+passwordHash");
   if (!user) {
      throw new Error("Sai email hoặc mật khẩu");
   }

   const isMatch = await bcrypt.compare(password, user.passwordHash);
   if (!isMatch) {
      throw new Error("Sai email hoặc mật khẩu");
   }

   // Tạo access token
   const accessToken = generateAccessToken(user.userId);

   // Tạo refresh token với thời hạn phụ thuộc vào rememberMe
   const refreshToken = rememberMe 
      ? generateRefreshToken(user.userId, "7d")  
      : generateRefreshToken(user.userId, "1d"); 

   return { 
      accessToken,
      refreshToken
   };
};

// Cập nhật thông tin người dùng
export const updateUserService = async (userId, userData) => {
   const updateData = {
      ...userData,
      updatedAt: Date.now() 
   };

   const updatedUser = await User.findOneAndUpdate(
      { userId },
      updateData,
      { new: true }
   );

   if (!updatedUser) {
      throw new Error("Người dùng không tồn tại");
   }

   return updatedUser;
};
// Xóa tài khoản người dùng
export const deleteUserService = async (userId) => {
   const deletedUser = await User.findOneAndDelete({ userId });

   if (!deletedUser) {
      throw new Error("Người dùng không tồn tại");
   }

   return { message: "Xóa tài khoản thành công" };
};
