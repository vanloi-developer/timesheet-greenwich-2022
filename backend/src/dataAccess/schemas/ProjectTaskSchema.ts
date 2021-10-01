import { Schema } from "mongoose";

import { IProjectTask } from "../../interfaces";

export const ProjectTaskSchema = new Schema<IProjectTask>({
  id: { type: Number, required: true },

  billable: { type: Boolean, default: true },

  taskId: { type: Number },

  projectId: { type: Number },
});
