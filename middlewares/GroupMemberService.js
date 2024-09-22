import GroupMember from "../models/groupMember.js";

export const newGroupMember = async (req, res) => {
   await GroupMember.create({
      groupId: "1b0fec4c-024d-483f-a07d-314a6fc942e6",
      userId: "6be131d4-7bb4-4abf-94ae-6310c376fb0a",
      role: "Sub_admin"
   });
   res.status(201).json({ message: "Group member added successfully!" });
};