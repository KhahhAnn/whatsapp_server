import { User } from "../models/User.js";

export const getUserService = async (userId) => {
   try {
      return await User.findOne({ userId });
   } catch (error) {
      throw new Error("Lỗi khi truy vấn dữ liệu: " + error.message);
   }   
};

export const getUserByEmailService = async (email) => {
   try {
      return await User.findOne({ email });
   } catch (error) {
      throw new Error("Lỗi khi truy vấn dữ liệu: " + error.message);
   }   
};

export const getUserByPhoneNumberService = async (phoneNumber) => {
   try {
      return await User.findOne({ phoneNumber });
   } catch (error) {
      throw new Error("Lỗi khi truy vấn dữ liệu: " + error.message);
   }   
};


export const getAllUsersService = async () => {
   try {
      return await User.find(); 
   } catch (error) {
      throw new Error("Lỗi khi truy vấn dữ liệu: " + error.message);
   }
};

