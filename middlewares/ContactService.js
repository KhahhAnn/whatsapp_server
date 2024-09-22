import Contact from "../models/contact.js";

export const newContact = async (req, res) => {
   await Contact.create({
      userId: "281c0301-3cfa-4f64-98ac-b0cfa56be86a",
      contactUserId: "6be131d4-7bb4-4abf-94ae-6310c376fb0a",
      nickname: "An2",
      status: "Active"
   });
   res.status(201).json({ message: "Contact created successfully!" });
};
