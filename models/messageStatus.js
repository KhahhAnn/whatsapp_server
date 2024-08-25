import mongoose, { model, Schema, Types } from "mongoose";

const messageStatusSchema = new Schema({
   statusId: {
      type: Types.UUID,
      default: () => Types.UUID(),
      unique: true
   },
   messageId: {
      type: Types.UUID,
      required: true,
      ref: 'Message' 
   },
   userId: {
      type: Types.UUID,
      required: true,
      ref: 'User'  
   },
   status: {
      type: String
   },
   updatedAt: {
      type: Date,
      default: Date.now
   }
});

const MessageStatus = mongoose.models.MessageStatus || model("MessageStatus", messageStatusSchema);
export default MessageStatus;
