import { UserStatus } from "../models/userStatus.js";

export const newUserStatus = async (req, res) => {
   await UserStatus.create({
      userId: "281c0301-3cfa-4f64-98ac-b0cfa56be86a",
      statusText: "Feeling great!",
      mediaUrl: "",
      expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) // Expire sau 24 giờ
   });
   res.status(201).json({ message: "User status created successfully!" });
};