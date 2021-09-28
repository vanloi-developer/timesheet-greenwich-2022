import { Schema } from "mongoose";

import { ProjectUserType } from "../../app/enums";

import { IProjectUsers } from "../../interfaces";

export const ProjectUsersSchema = new Schema<IProjectUsers>({
  id: { type: Number, required: true },

  type: { type: Number, enum: ProjectUserType },

  userId: { type: Number, required: true },

  projectId: { type: Number },
});
