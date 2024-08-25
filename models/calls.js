import mongoose, { model, Schema, Types } from "mongoose";

const callSchema = new Schema({
   callId: {
      type: Types.UUID,
      default: () => Types.UUID(),
      unique: true
   },
   callerId: {
      type: Types.UUID,
      required: true,
      ref: 'User'  
   },
   receiverId: {
      type: Types.UUID,
      required: true,
      ref: 'User' 
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

const Call = mongoose.models.Call || model("Call", callSchema);
export default Call;
