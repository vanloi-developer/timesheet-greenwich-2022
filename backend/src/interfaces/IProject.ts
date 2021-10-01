import { ProjectStatus, ProjectType } from "src/app/enums";

import { IProjectTask, IProjectUsers } from ".";

import { IBase } from "./IBase";

export interface IProject extends IBase {
  name: string;

  code: string;

  customerId: number;

  id: number;

  status: ProjectStatus;

  isAllUserBelongTo?: boolean;

  timeStart: string;

  timeEnd: string;

  note: string;

  projectType: ProjectType;

  tasks?: IProjectTask[];

  users?: IProjectUsers[];

  projectTargetUsers?: [];
}
