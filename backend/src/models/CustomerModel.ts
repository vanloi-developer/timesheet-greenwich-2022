import mongoose, { Schema } from 'mongoose';
import { ICustomerModel } from '../types/ICustomerModel';

const CustomerSchema: Schema = new Schema({
   id: { type: Number, required: true },
   name: { type: String, requierd: true, default: null },
   address: { type: String, default: null },
});

export default mongoose.model<ICustomerModel>('Customer', CustomerSchema);
