import { Response, Request, NextFunction } from "express";

import { GetTimesheetDto } from "../dto/responses";

import { MyTimesheetService } from "../services";

import { BaseController } from "./base";

import { ApiResponse } from "../core/responses";

import { IResponse } from "../core/responses/interfaces";

import { HttpStatusCode } from "../enums";

class MyTimesheetController extends BaseController<MyTimesheetService> {
  constructor() {
    super(new MyTimesheetService());
  }

  public getAllTimesheetOfUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const startDate = String(req.query.startDate);
      const endDate = String(req.query.endDate);

      const result: GetTimesheetDto[] =
        await this._business.getAllTimesheetOfUser(startDate, endDate);

      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}

Object.seal(MyTimesheetController);
export { MyTimesheetController };
