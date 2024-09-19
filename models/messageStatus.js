import mongoose, { model, Schema, Types } from "mongoose";
import { v4 as uuidv4 } from 'uuid'; 

const messageStatusSchema = new Schema({
   statusId: {
      type: String,
      default: () => uuidv4(), 
      unique: true
   },
   messageId: {
      type: String,
      required: true,
      ref: 'Message' 
   },
   userId: {
      type: String,
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

const MessageStatus = mongoose.models.MessageStatus || model("message_status", messageStatusSchema);
export default MessageStatus;
