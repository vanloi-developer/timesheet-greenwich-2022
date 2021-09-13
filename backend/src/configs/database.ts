import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

import { IMongoOption } from "../dataAccess/mongo/interface";

const MONGO_OPTIONS: IMongoOption = {
  useNewUrlParser: true,
  useFindAndModify: false,

  useUnifiedTopology: true,
};

export const DATABASE = {
  MONGO_URI: process.env.MONGO_URI,
  MONGO_OPTIONS,
};
