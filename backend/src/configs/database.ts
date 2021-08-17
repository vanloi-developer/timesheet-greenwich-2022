import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

const DB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const DB_NAME = process.env.DB_NAME,
  DB_HOST = process.env.DB_HOST,
  DB_PORT = process.env.DB_PORT;

const DB_URI = `${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export = {
  DB_NAME,

  DB_PORT,

  DB_HOST,

  DB_OPTIONS,

  DB_URI,
};
