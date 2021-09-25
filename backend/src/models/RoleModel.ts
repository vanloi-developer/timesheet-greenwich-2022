import { IRoleModel } from './../types/IRoleModel';
import dotenv from 'dotenv';
import mongoose, { Schema } from 'mongoose';

dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

const RoleSchema: Schema = new Schema({
   name: { type: String, required: true },
   displayName: { type: String, required: true },
   normalizedName: { type: String, required: true },
   description: null,
   id: { type: Number, required: true },
});

export default mongoose.model<IRoleModel>('Role', RoleSchema);
