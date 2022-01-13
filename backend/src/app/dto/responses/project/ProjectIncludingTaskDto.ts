import { PTaskDto } from "..";
import { ProjectUserType } from "../../../enums";

export interface ProjectIncludingTaskDto {
  projectName: string;

  customerName: string;

  projectCode: string;

  projectUserType: ProjectUserType;

  listPM: string[];

  tasks: PTaskDto[];

  targetUsers: [];

  id: number;
}
