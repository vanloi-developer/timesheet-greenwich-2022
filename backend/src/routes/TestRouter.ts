import { NextFunction, Request, Response, Router } from 'express';
import TestService from '../services/test/TestService';

/**
 * @description TestRouter.
 */
class TestRouter {
  private _router = Router();
  private _service = TestService;

  get router() {
    return this._router;
  }

  constructor() {
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  private init() {
    this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._service.defaultMethod());
    });
  }
}

export = new TestRouter().router;