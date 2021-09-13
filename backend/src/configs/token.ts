import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

const OPTIONS = {
  expiresIn: 86400,
};

export const TOKEN = {
  SECRET_KEY: process.env.SECRET_KEY,
  OPTIONS,
};
