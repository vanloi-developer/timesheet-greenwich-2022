import Application from "./app";

function start(_app: Application) {
  _app.start();
  _app.accessDatabase();
}

start(new Application());
