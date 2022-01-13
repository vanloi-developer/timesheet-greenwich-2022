import { RoleEditDto } from "./RoleEditDto";

export interface GetRoleForEditOutput {
  role: RoleEditDto;

  permissions: [];

  grantedPermissionNames: [string];

  users: [];
}
