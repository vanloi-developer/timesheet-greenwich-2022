import { ListResultDto } from "../../common/ListResultDto";

import { RoleDto } from "../role/RoleDto";

export interface ListResultRoleDto extends ListResultDto {
  items: [RoleDto];
}
