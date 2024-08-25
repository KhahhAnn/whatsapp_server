import mongoose, { model, Schema, Types } from "mongoose";

const userStatusSchema = new Schema({
   statusId: {
      type: Types.UUID,
      default: () => Types.UUID(),
      unique: true
   },
   userId: {
      type: Types.UUID,
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

const UserStatus = mongoose.models.UserStatus || model("UserStatus", userStatusSchema);
export default UserStatus;
