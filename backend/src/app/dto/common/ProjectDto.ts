import { ProjectStatus, ProjectType } from "../../../app/enums";
import { IProject, IProjectTask, IProjectUsers } from "../../../interfaces";

export interface ProjectDto extends IProject {
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
