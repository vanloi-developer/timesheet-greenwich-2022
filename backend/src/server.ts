import express from 'express';
import MasterRoute from './routes/MasterRoute';
/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
export class Server {
  public app = express();
  public router = MasterRoute;
}
