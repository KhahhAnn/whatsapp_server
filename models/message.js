import mongoose, { model, Schema, Types } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const messageSchema = new Schema({
   messageId: {
      type: Types.UUID,
      default: () => Types.UUID(),
      unique: true
   },
   senderId: {
      type: Types.UUID,
      required: true,
      ref: 'User'  
   },
   receiverId: {
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

const Message = mongoose.models.Message || model("Message", messageSchema);
export default Message;
