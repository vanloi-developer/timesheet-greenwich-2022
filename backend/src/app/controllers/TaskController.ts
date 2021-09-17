import { NextFunction, Request, Response } from "express";
import { DataResponse } from "../core";
import { IResponse } from "../core/responses/interfaces";
import { TaskDto } from "../dto/requests";
import { HttpStatusCode } from "../enums";
import { TaskService } from "../services";
import { BaseController } from "./base";

class TaskController extends BaseController<TaskService> {
  constructor() {
    super(new TaskService());
  }

  public save = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task: TaskDto = req.body;

      const result: TaskDto = await this._business.save(task);

      const response: IResponse = {
        error: null,

        result,

        success: false,

        targetUrl: null,

        unAuthorizedRequest: false,

        __abp: true,
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = Number(req.query.id);

      const result = await this._business.delete(id);

      const response: IResponse = {
        error: null,

        result,

        success: false,

        targetUrl: null,

        unAuthorizedRequest: false,

        __abp: true,
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: TaskDto[] = await this._business.getAll();

      const response: IResponse = {
        error: null,

        result,

        success: false,

        targetUrl: null,

        unAuthorizedRequest: false,

        __abp: true,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public archive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = Number(req.query.id);
      const result = await this._business.archive(id);

      const response: IResponse = {
        error: null,

        result,

        success: false,

        targetUrl: null,

        unAuthorizedRequest: false,

        __abp: true,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public deArchive = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id: number = Number(req.query.id);
      const result = await this._business.deArchive(id);

      const response: IResponse = {
        error: null,

        result,

        success: false,

        targetUrl: null,

        unAuthorizedRequest: false,

        __abp: true,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}

Object.seal(TaskController);
export { TaskController };
