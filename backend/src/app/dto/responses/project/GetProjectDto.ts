import { ProjectStatus, ProjectType } from "../../../enums";

export interface GetProjectDto {
  customerName: string;

  id: number;
  name: string;
  code: string;
  status: ProjectStatus;

  pms: string[];

  activeMember: number;
  projectType: ProjectType;

  timeStart: string;
  timeEnd: string;
}
