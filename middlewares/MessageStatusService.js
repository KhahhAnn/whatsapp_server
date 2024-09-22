import MessageStatus from "../models/messageStatus.js";

export const newMessageStatus = async (req, res) => {
   await MessageStatus.create({
      messageId: "4d8a8708-deef-4e5b-b290-0e373c117489",
      userId: "6be131d4-7bb4-4abf-94ae-6310c376fb0a",
      status: "Read"
   });
   res.status(201).json({ message: "Message status updated successfully!" });
};