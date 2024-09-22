import Group from "../models/groups.js";

export const newGroup = async (req, res) => {
   await Group.create({
      groupName: "Family Group",
      createdBy: "281c0301-3cfa-4f64-98ac-b0cfa56be86a"
   });
   res.status(201).json({ message: "Group created successfully!" });
};
