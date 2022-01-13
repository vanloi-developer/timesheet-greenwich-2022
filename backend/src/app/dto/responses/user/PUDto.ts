import { ProjectUserType } from "../../../enums";

export interface PUDto {
  projectId: number;
  projectCode: string;
  projectName: string;
  projectUserType: ProjectUserType;
  pms: string[];
}
