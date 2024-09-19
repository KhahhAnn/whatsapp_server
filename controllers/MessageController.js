import Message from "../models/message.js";

export const newMessage = async (req, res) => {
   await Message.create({
      senderId: "281c0301-3cfa-4f64-98ac-b0cfa56be86a",
      receiverId: "6be131d4-7bb4-4abf-94ae-6310c376fb0a",
      content: "Hello!",
      status: "Sent"
   });
   res.status(201).json({ message: "Message sent successfully!" });
};