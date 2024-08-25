import mongoose, { model, Schema, Types } from "mongoose";

const groupSchema = new Schema({
   groupId: {
      type: Types.UUID,
      default: () => Types.UUID(),
      unique: true
   },
   groupName: {
      type: String,
      required: true
   },
   createdBy: {
      type: Types.UUID,
      required: true,
      ref: 'User' 
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

const Group = mongoose.models.Group || model("Group", groupSchema);
export default Group;
