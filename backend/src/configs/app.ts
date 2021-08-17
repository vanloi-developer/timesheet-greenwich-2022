import dotenv from "dotenv";
dotenv.config({
  path: `.env`,
});

export = {
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  NODE_ENV: process.env.NODE_ENV,
};
