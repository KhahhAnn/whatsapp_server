import mongoose, { model, Schema, Types } from "mongoose";

const groupChatSchema = new Schema({
   groupChatId: {
      type: Types.UUID,
      default: () => Types.UUID(),
      unique: true
   },
   groupId: {
      type: Types.UUID,
      required: true,
      ref: 'Group'  
   },
   senderId: {
      type: Types.UUID,
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

const GroupChat = mongoose.models.GroupChat || model("GroupChat", groupChatSchema);
export default GroupChat;
