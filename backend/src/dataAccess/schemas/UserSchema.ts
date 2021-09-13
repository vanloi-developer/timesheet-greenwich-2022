import * as mongoose from "mongoose";

import { IUser } from "../../app/interfaces";

import { PasswordManager } from "../../app/tools";

export const userSchema: mongoose.Schema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, require: true },
  surname: { type: String, require: true },
  password: { type: String, require: true },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    user.password = await PasswordManager.hash(user.password);
    next();
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  await PasswordManager.compare(candidatePassword, this.password)
    .then((value) => {
      return value;
    })
    .catch((err) => {
      return err;
    });
};

export const userModel: mongoose.Model<IUser> = mongoose.model<IUser>(
  "users",
  userSchema
);
