import { Model, model } from "mongoose";

import { TaskSchema } from "../../src/dataAccess/schemas";

import { ITask } from "../interfaces/";

export const TaskModel: Model<ITask> = model<ITask>("tasks", TaskSchema);
