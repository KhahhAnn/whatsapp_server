import mongoose, { model, Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const contactSchema = new Schema({
   contactId: {
      type: String,
      default: () => uuidv4(), 
      unique: true
   },
   userId: {
      type: String,
      required: true,
      ref: 'User'  
   },
   contactUserId: {
      type: String,
      required: true,
      ref: 'User' 
   },
   nickname: {
      type: String
   },
   status: {
      type: String
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

const Contact = mongoose.models.Contact || model("contact", contactSchema);
export default Contact;