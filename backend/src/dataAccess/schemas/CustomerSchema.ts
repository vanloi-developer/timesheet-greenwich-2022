import * as mongoose from "mongoose";

import { ICustomer } from "../../interfaces";

export const CustomerSchema = new mongoose.Schema<ICustomer>({
  id: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
  },
});
