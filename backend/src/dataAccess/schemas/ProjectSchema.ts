import { Schema } from "mongoose";

import { ProjectStatus, ProjectType } from "../../app/enums";

import { IProject } from "../../interfaces";

export const ProjectSchema = new Schema<IProject>({
  id: { type: Number, required: true },

  customerId: { type: Number, required: true },

  name: { type: String, required: true },

  code: { type: String, required: true },

  status: { type: Number, enum: ProjectStatus, default: 0 },

  isAllUserBelongTo: { type: Boolean, default: false },

  timeStart: { type: String },

  timeEnd: { type: String },

  note: { type: String },

  projectType: { type: Number, enum: ProjectType },

  projectTargetUsers: { type: [], default: [] },
});
