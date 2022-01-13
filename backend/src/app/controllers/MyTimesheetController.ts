import { MyTimesheetService } from "../services";

import { Response, Request, NextFunction } from "express";

import { GetTimesheetDto, MyTimesheetDto } from "../dto/responses";

import { StartEndDateDto } from "../dto/common/StartEndDateDto";

import { IResponse } from "../core/responses/interfaces";

import { ApiResponse } from "../core/responses";

import { HttpStatusCode } from "../enums";

class MyTimesheetController {
  private _business: MyTimesheetService = new MyTimesheetService();

  public saveList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items: MyTimesheetDto[] = req.body;

      const userId = +req.app.locals.currentUser.id;

      const result: MyTimesheetDto[] = await this._business.saveList(
        items,
        userId
      );

      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = +req.query.Id;

      const result: boolean = await this._business.delete(id);
      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public save = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item: MyTimesheetDto = req.body;

      item.userId = +req.app.locals.currentUser.id;

      const result: MyTimesheetDto = await this._business.create(item);

      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      return res.status(HttpStatusCode.CREATEAD).json(response);
    } catch (error) {
      next(error);
    }
  };

  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = +req.query.id;

      const result: MyTimesheetDto = await this._business.get(id);

      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public submitToPending = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { startDate, endDate } = req.body;

      const userId: number = +req.app.locals.currentUser.id;

      const date: StartEndDateDto = {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      };

      const result: boolean = await this._business.submitToPending(
        userId,
        date
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

  public getAllTimesheetOfUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const startDate: Date = new Date(String(req.query.startDate));

      const endDate: Date = new Date(String(req.query.endDate));

      const userId: number = req.app.locals.currentUser.id;

      const result: GetTimesheetDto[] =
        await this._business.getAllTimesheetOfUser(userId, startDate, endDate);

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
