import dotenv from 'dotenv';
import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { IUserModel } from '../types/IUserModel';
import bcrypt from 'bcrypt';

dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

const UserSchema: Schema = new Schema({
   id: { type: Number, required: true },
   password: { type: String, required: true },
   userName: { type: String, default: null },
   name: { type: String, default: null },
   surname: { type: String, default: null },
   fullName: { type: String, default: null },
   emailAddress: { type: String, default: null },
   phoneNumber: { type: String, default: null },
   address: { type: String, default: null },
   isActive: { type: Boolean, default: null },
   roleNames: { type: Array },
   projectUsers: { type: Array },
   type: { type: Number, default: null },
   salary: { type: Number, default: null },
   salaryAt: { type: String, default: null },
   startDateAt: { type: Date, default: null },
   allowedLeaveDay: { type: Number, default: null },
   userCode: { type: String, default: null },
   jobTitle: { type: String, default: null },
   level: { type: Number, default: null },
   registerWorkDay: { type: Number, default: null },
   avatarPath: { type: String, default: null },
   managerId: { type: Number, default: 1 },
   managerAvatarPath: { type: String, default: null },
   managerName: { type: String, default: null },
   branch: { type: Number, default: null },
   sex: { type: Number, default: null },
   creationTime: { type: Date, default: new Date() },
   morningWorking: { type: Number, default: null },
   morningStartAt: { type: String, default: null },
   morningEndAt: { type: String, default: null },
   afternoonWorking: { type: Number, default: null },
   afternoonStartAt: { type: String, default: null },
   afternoonEndAt: { type: String, default: null },
});

UserSchema.methods.generateAuthToken = async function () {
   const token = await jwt.sign(
      {
         id: this.id,
         roleNames: this.roleNames,
      },
      JWT_KEY,
   );
   return token;
};

UserSchema.methods.comparePassHash = async function (plainPass: String) {
   return await bcrypt.compare(plainPass, this.password);
};

export default mongoose.model<IUserModel>('User', UserSchema);
