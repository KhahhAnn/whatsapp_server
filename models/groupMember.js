import mongoose, { model, Schema, Types } from "mongoose";

const groupMemberSchema = new Schema({
   groupMemberId: {
      type: Types.UUID,
      default: () => Types.UUID(),
      unique: true
   },
   groupId: {
      type: String,
      required: true,
      ref: 'Group'  
   },
   userId: {
      type: Types.UUID,
      required: true,
      ref: 'User'  
   },
   joinedAt: {
      type: Date,
      default: Date.now
   },
   role: {
      type: String
   }
});

const GroupMember = mongoose.models.GroupMember || model("GroupMember", groupMemberSchema);
export default GroupMember;
