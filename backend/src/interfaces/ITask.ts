import { Task } from "src/app/enums";

import { Document } from "mongoose";

export interface ITask extends Document {
  name: string;
  type?: Task;
  isDeleted?: boolean;
  id: number;
}
