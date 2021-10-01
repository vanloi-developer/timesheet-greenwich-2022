import { Schema } from "mongoose";

import { Task } from "../../app/enums";

export const TaskSchema: Schema = new Schema({
  name: { type: String, required: true },

  type: {
    type: Number,
    enum: Task,
  },

  isDeleted: { type: Boolean, default: false },

  id: { type: Number, required: true },
});
