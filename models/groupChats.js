import mongoose, { model, Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const groupChatSchema = new Schema({
   groupChatId: {
      type: String,
      default: () => uuidv4(), 
      unique: true
   },
   groupId: {
      type: String,
      required: true,
      ref: 'Group'  
   },
   senderId: {
      type: String,
      required: true,
      ref: 'User'  
   },
   content: {
      type: String
   },
   mediaUrl: {
      type: String
   },
   sentAt: {
      type: Date,
      default: Date.now
   },
   status: {
      type: String
   }
});

const GroupChat = mongoose.models.GroupChat || model("group_chat", groupChatSchema);
export default GroupChat;
