import { RoleDto } from "./RoleDto";

export interface RoleEditDto extends RoleDto {
  isStatic: boolean;
}
