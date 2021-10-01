import { Schema } from "mongoose";

import { IRole } from "../../interfaces";

export const RoleSchema = new Schema<IRole>({
  name: { type: String, required: true },

  displayName: { type: String },

  normalizedName: { type: String },

  description: { type: String },

  id: { type: Number },
});
