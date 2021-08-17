import mongoose from "mongoose";

import config from "../configs/database";

import Logger from "../app/Providers/winston";

interface IMongooseOptions {
  [key: string]: boolean;
}

class MongoooseConnection {
  private static readonly _uri: string = config.DB_URI;

  private static readonly _options: IMongooseOptions = config.DB_OPTIONS;

  constructor() {}

  public static async connect() {
    try {
      await mongoose.connect(this._uri, this._options);
      Logger.logger.info(`Successfully connected to the database`);
    } catch (error) {
      Logger.logger.debug(
        `Failed to connecting to the database, error: ${error}`
      );
    }
  }
}

export = MongoooseConnection;
