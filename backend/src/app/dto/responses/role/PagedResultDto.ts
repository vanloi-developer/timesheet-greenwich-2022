import { RoleDto } from "./RoleDto";

import { PagedResultDto } from "../../common/PagedResultDto";

export interface PagedResultRoleDto extends PagedResultDto {
  items: RoleDto[];
}
