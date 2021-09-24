import dotenv from 'dotenv';
import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { IUserModel } from '../types/IUserModel';

dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

const UserSchema: Schema = new Schema({
   id: { type: Number, required: true },
   password: { type: String, required: true },
   roleNames: { type: Array },
   isActive: { type: Boolean },
   allowedLeaveDay: { type: Number },
   branch: { type: Number },
   userName: { type: String },
   emailAddress: { type: String },
   type: { type: Number },
   name: { type: String },
   surname: { type: String },
   sex: { type: Boolean },
   userCode: { type: String },
   isStopWork: { type: Boolean },
   managerId: { type: Number },
   level: { type: Number },
   salary: { type: Number },
   salaryAt: { type: String },
   address: { type: String },
   phoneNumber: { type: String },
   morningStartAt: { type: String },
   morningEndAt: { type: String },
   morningWorking: { type: Number },
   afternoonStartAt: { type: String },
   afternoonEndAt: { type: String },
   afternoonWorking: { type: Number },
   createdAt: { type: Date, default: new Date() },
});

UserSchema.methods.generateAuthToken = function () {
   const token = jwt.sign(
      {
         id: parseInt(this.userCode),
         name: this.name,
         email: this.email,
         type: this.type,
      },
      JWT_KEY,
   );
   return token;
};

export default mongoose.model<IUserModel>('User', UserSchema);
