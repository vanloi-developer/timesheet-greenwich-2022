import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
   id: { type: Number, required: true },
   name: { type: String, required: true },
   password: { type: String, required: true },
   surname: { type: String, required: true },
   userName: { type: String, required: true },
   emailAddress: { type: String, required: true },
   allowedLeaveDay: { type: Number },
   type: { type: Array },
   level: { type: Array },
   sex: { type: Boolean },
   branch: { type: Number },
   avatarPath: { type: String },
   morningWorking: { type: String },
   morningStartAt: { type: String },
   morningEndAt: { type: String },
   afternoonWorking: { type: String },
   afternoonStartAt: { type: String },
   afternoonEndAt: { type: String },
   isWorkingTimeDefault: { type: Boolean },
   projects: { type: Array },
   salary: { type: Number },
   salaryAt: { type: String },
   manager: { type: Number },
   IsActive: { type: Boolean, default: true },
   creationTime: { type: Date, default: new Date() },
});

export default mongoose.model("User", UserSchema);
