import mongoose, { NativeError } from "mongoose";

import { DATABASE } from "../../configs";

import { IMongoOption } from "./interface";

class DataAccess {
  private static uri: string = DATABASE.MONGO_URI;

  /**
   * useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options.
   * Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false.
   * If you use Mongoose version lower 6, please delare the following line, and add it into agrument in mongoose.connect()
   *
   * private static options: IMongoOption = DATABASE.MONGO_OPTIONS;
   */

  public static async connect() {
    try {
      await mongoose.connect(this.uri);
      console.log(`Successfully to connected to DATABASE at ${this.uri}`);
    } catch (error) {
      console.log(`Error when making connection to mongodb: ${error}`);
      throw new Error(error);
    }
  }
}

export { DataAccess };
