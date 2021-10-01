import { ProjectUserType } from "../app/enums";

import { IBase } from "./IBase";

export interface IProjectUsers extends IBase {
  userId: number;

  type: ProjectUserType;

  id?: number;

  projectId?: number;
}
