import { createCallService, endCallService, getCallDetailsService, getCallsByUserService } from "../middlewares/CallService.js";

// Tạo cuộc gọi mới
export const createCall = async (req, res) => {
   const { callerId, receiverId, callType } = req.body;
   
   try {
      const call = await createCallService({ callerId, receiverId, callType });
      res.status(201).json({ message: "Tạo cuộc gọi thành công", call });
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi tạo cuộc gọi", error: err.message });
   }
};

// Kết thúc cuộc gọi
export const endCall = async (req, res) => {
   const { callId } = req.params;
   if (!callId) {
      return res.status(400).json({ message: "callId không hợp lệ" });
   }

   try {
      const call = await endCallService(callId);
      if (!call) {
         return res.status(404).json({ message: "Không tìm thấy cuộc gọi" }); 
      }
      res.json({ message: "Kết thúc cuộc gọi thành công", call });
   } catch (err) {   
      res.status(500).json({ message: "Lỗi khi kết thúc cuộc gọi", error: err.message });
   }
};

// Lấy chi tiết cuộc gọi
export const getCallDetails = async (req, res) => {
   const { callId } = req.params;

   try {
      const call = await getCallDetailsService(callId);
      if (!call) {
         return res.status(404).json({ message: "Không tìm thấy cuộc gọi" });
      }
      res.json(call);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy chi tiết cuộc gọi", error: err.message });
   }
};

// Lấy danh sách cuộc gọi của một người dùng
export const getCallsByUser = async (req, res) => {
   const { userId } = req.params;

   try {
      const calls = await getCallsByUserService(userId);
      res.json(calls);
   } catch (err) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách cuộc gọi", error: err.message });
   }
};
