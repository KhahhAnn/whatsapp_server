import mongoose, { model, Schema, Types } from "mongoose";

const contactSchema = new Schema({
   contactId: {
      type: Types.UUID,
      default: () => Types.UUID(),
      unique: true
   },
   userId: {
      type: Types.UUID,
      required: true,
      ref: 'User'  
   },
   contactUserId: {
      type: Types.UUID,
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

const Contact = mongoose.models.Contact || model("Contact", contactSchema);
export default Contact;
