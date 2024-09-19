import mongoose, { model, Schema, Types } from "mongoose";
import { v4 as uuidv4 } from 'uuid'; 

const userStatusSchema = new Schema({
   statusId: {
      type: String,
      default: () => uuidv4(), 
      unique: true
   },
   userId: {
      type: String,
      required: true,
      ref: 'User' 
   },
   statusText: {
      type: String
   },
   mediaUrl: {
      type: String
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   expiresAt: {
      type: Date
   }
});

export const UserStatus = mongoose.models.UserStatus || model("user_status", userStatusSchema);
