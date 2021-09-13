import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;

  name: string;

  surname: string;

  emailAddress: string;

  password: string;
}
