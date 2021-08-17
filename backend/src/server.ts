import express, { Application } from 'express';
import MasterRouter from './routes/MasterRouter';

class Server {
  public _app: Application = express();
  public _routes = MasterRouter;
}

Object.seal(Server);
export = Server;
