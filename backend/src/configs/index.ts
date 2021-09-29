import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

const NODE_ENV = process.env.NODE_ENV;

const PORT = process.env.PORT;

const OPTIONS = {
  expiresIn: +process.env.EXPIRESIN_TOKEN,
};

const MONGO_URI = process.env.MONGO_URI;

const TOKEN = {
  SECRET_KEY: process.env.SECRET_KEY,
  OPTIONS,
};

const APP_VERSION = process.env.APP_VERSION;

export { PORT, MONGO_URI, NODE_ENV, TOKEN, APP_VERSION };
