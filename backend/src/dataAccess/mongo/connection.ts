import mongoose from "mongoose";

import { ApiError } from "../../app/core";

import { HttpStatusCode } from "../../app/enums";

import { MONGO_URI } from "../../configs";
class DataAccess {
  public static connect = async () => {
    await mongoose
      .connect(MONGO_URI)
      .then(() => {
        console.log(`Database connected: ${MONGO_URI}`);
      })
      .catch((err) => {
        throw new ApiError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          `Failure to connect to the database`
        );
      });
  };
}

Object.seal(DataAccess);
export { DataAccess };
