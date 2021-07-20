import dotenv from "dotenv";
import { Application } from "./app";

// load the environment variables from the .env file
dotenv.config({
  path: ".env",
});

async function bootstrap() {
  const application = new Application();
  await application.init();
  application.start();
}

bootstrap();
