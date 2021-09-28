import { IProjectTask } from "../../../../interfaces";
import { ProjectUserType } from "../../../enums";

export interface ProjectIncludingTaskDto {
  projectName: string;

  customerName: string;

  projectCode: string;

  projectUserType: ProjectUserType;

  listPM: string[];

  tasks: IProjectTask[];

  targetUsers: [];

  id: number;
}
