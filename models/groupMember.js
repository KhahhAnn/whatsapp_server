import mongoose, { model, Schema, Types } from "mongoose";
import { v4 as uuidv4 } from 'uuid'; 

const groupMemberSchema = new Schema({
   groupMemberId: {
      type: String,
      default: () => uuidv4(), 
      unique: true
   },
   groupId: {
      type: String,
      required: true,
      ref: 'Group'  
   },
   userId: {
      type: String,
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

const GroupMember = mongoose.models.GroupMember || model("group_member", groupMemberSchema);
export default GroupMember;
