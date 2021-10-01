import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../core";
import { IResponse } from "../core/responses/interfaces";
import { MyTimesheetDto, TimesheetDto } from "../dto/responses";
import { HttpStatusCode } from "../enums";
import { TimesheetService } from "../services";
import { BaseController } from "./base";

class TimesheetController extends BaseController<TimesheetService> {
  constructor() {
    super(new TimesheetService());
  }

  public retrieve = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = +req.app.locals.currentUser.id;
      const startDate = String(req.query.startDate);
      const endDate = String(req.query.endDate);
      const status = +req.query.status;

      const result: TimesheetDto[] = await this._business.getAll(
        userId,
        startDate,
        endDate,
        status
      );

      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public approve = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ids: number[] = req.body;

      await this.retrieve;

      const result = await this._business.approve(ids);

      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public reject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ids: number[] = req.body;

      const result = await this._business.reject(ids);

      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}

Object.seal(TimesheetController);
export { TimesheetController };