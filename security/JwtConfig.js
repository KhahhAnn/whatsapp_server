import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { User } from '../models/User.js';


dotenv.config({
   path: "./.env",
});

// Tạo access token
export const generateAccessToken = (user) => {
   return jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Tạo refresh token
export const generateRefreshToken = (user) => {
   return jwt.sign({ userId: user.userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// Xác thực token
export const verifyToken = (token) => {
   try {
      return jwt.verify(token, process.env.JWT_SECRET);
   } catch (err) {
      throw new Error('Token không hợp lệ');
   }
};

export const refreshAccessToken = async (req, res) => {
   const refreshToken = req.cookies.refreshToken; // Lấy refresh token từ cookie

   if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token không hợp lệ" });
   }

   try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET); 
      const user = await User.findById(decoded.userId);
      
      // Kiểm tra xem refresh token có khớp không
      if (!user || user.refreshToken !== refreshToken) {
         return res.status(403).json({ message: "Refresh token không hợp lệ" });
      }

      const newAccessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ accessToken: newAccessToken });
   } catch (error) {
      res.status(403).json({ message: "Refresh token không hợp lệ" });
   }
};

// Middleware kiểm tra access token
export const authenticateToken = async (req, res, next) => {
   const token = req.header('Authorization')?.split(' ')[1];
   const refreshToken = req.cookies.refreshToken; // Lấy refresh token từ cookie

   if (!token) {
      return res.status(401).json({ message: 'Bạn cần đăng nhập để thực hiện thao tác này' });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
   } catch (err) {
      // Nếu token hết hạn, kiểm tra refresh token
      if (!refreshToken) {
         return res.status(401).json({ message: 'Refresh token không hợp lệ' });
      }

      try {
         const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
         const user = await User.findById(decodedRefreshToken.userId);

         // Kiểm tra xem refresh token có khớp không
         if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Refresh token không hợp lệ' });
         }

         const newAccessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
         req.user = { userId: user.userId }; // Cập nhật user trong req
         res.setHeader('Authorization', `Bearer ${newAccessToken}`); // Gửi lại access token mới trong header
         return next();
      } catch (refreshError) {
         return res.status(403).json({ message: 'Refresh token không hợp lệ' });
      }
   }
};

