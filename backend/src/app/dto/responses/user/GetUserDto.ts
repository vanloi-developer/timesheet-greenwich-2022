import { Branch, Level, TypeUser } from "../../../enums";

export interface GetUserDto {
  name: string;
  isActive: boolean;
  type: TypeUser;
  jobTitle: string;
  level: Level;
  userCode: string;
  avatarPath?: string;
  branch: Branch;
  id: number;
}
