import { IResponse } from "src/app/core/responses/interfaces";
import { IUser } from "src/interfaces";

type User = Omit<IUser, "password">;

export interface UserDTO extends IResponse {
  result: User;
}
