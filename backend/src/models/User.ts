import { Model, model } from "mongoose";

import { UserSchema } from "../../src/dataAccess/schemas";

import { IUser } from "../interfaces/";

export const UserModel: Model<IUser> = model<IUser>("users", UserSchema);
