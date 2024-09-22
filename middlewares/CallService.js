import { Call } from "../models/CallsModel.js";

export const newCall = async (req, res) => {
   await Call.create({
      callerId: "281c0301-3cfa-4f64-98ac-b0cfa56be86a",
      receiverId: "6be131d4-7bb4-4abf-94ae-6310c376fb0a",
      startTime: new Date(),
      endTime: new Date(),
      callType: "Audio"
   });
   res.status(201).json({ message: "Call created successfully!" });
};

export const getCalls = async(req, res) => {
   try {
      const calls = await Call.find();
      res.status(200).json(calls);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}
