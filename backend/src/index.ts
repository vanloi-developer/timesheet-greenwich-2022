import { Application } from "./app";

// load the environment variables from the .env file

async function bootstrap() {
  const application = new Application();
  await application.init();
  application.start();
}

bootstrap();