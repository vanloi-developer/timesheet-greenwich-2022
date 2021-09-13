import Application from "./app";

(async function bootstrap(app: Application) {
  app.initializeMiddleware();
  app.init();

  await app.connectDatabase();

  //app.initializeErrorHandling();
})(new Application());
