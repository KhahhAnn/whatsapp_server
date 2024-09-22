import mongoose, { model, Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const groupSchema = new Schema({
   groupId: {
      type: String,
      default: () => uuidv4(), 
      unique: true
   },
   groupName: {
      type: String,
      required: true
   },
   createdBy: {
      type: String,
      required: true,
      ref: 'User' 
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

const Group = mongoose.models.Group || model("group", groupSchema);
export default Group;
