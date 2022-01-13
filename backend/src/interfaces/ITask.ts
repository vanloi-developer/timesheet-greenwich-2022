import { Task } from "src/app/enums";

import { IBase } from "./IBase";

export interface ITask extends IBase {
  name: string;

  type?: Task;

  isDeleted?: boolean;

  id: number;
}
