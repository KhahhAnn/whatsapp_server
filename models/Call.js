import mongoose, { model, Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const callSchema = new Schema({
   callId: {
      type: String,     
      default: () => uuidv4(), 
      unique: true
   },
   callerId: {
      type: String,
      required: true,
      ref: 'users' 
   },
   receiverId: {
      type: String,
      required: true,
      ref: 'users' 
   },
   startTime: {
      type: Date,
      required: true
   },
   endTime: {
      type: Date
   },
   callType: {
      type: String
   }
});

export const Call = mongoose.models.Call || model("call", callSchema);