import { IUser } from "src/interfaces";
import { UserSchema } from "../schemas";
import { BaseRepository } from "./base";

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super("users", UserSchema);
  }
}

Object.seal(UserRepository);
export { UserRepository };
