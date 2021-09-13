import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

export const APP = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.APP_PORT,
  HOST: process.env.APP_HOST,
};
