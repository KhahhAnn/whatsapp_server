import mongoose, { model, Schema, Types } from "mongoose";
import { v4 as uuidv4 } from 'uuid'; 


const userSchema = new Schema({
   userId: {
      type: String,
      default: () => uuidv4(), 
      unique: true
   },
   username: {
      type: String,
      required: true
   },
   email: {
      type: String,
      unique: true,
      required: true
   },
   phoneNumber: {
      type: String
   },
   status: {
      type: String
   },
   passwordHash: {
      type: String,
      required: true,
      select: false,
   },
   profilePicture: {
      type: String
   },
   isActive: {
      type: Boolean,
      default: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   updatedAt: {
      type: Date,
      default: Date.now
   }
});

export const User = mongoose.models.User || model("users", userSchema);