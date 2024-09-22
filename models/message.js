import mongoose, { model, Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const messageSchema = new Schema({
   messageId: {
      type: String,
      default: () => uuidv4(), 
      unique: true
   },
   senderId: {
      type: String,
      required: true,
      ref: 'User'  
   },
   receiverId: {
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

const Message = mongoose.models.Message || model("message", messageSchema);
export default Message;
