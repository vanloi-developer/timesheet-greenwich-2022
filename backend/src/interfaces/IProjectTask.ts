import { IBase } from "./IBase";

export interface IProjectTask extends IBase {
  taskId: number;

  billable: boolean;

  id?: number;

  projectId: number;
}
