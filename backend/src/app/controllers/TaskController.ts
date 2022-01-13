import { NextFunction, Request, Response } from "express";

import { IResponse } from "../core/responses/interfaces";

import { TaskDto } from "../dto/requests";

import { HttpStatusCode } from "../enums";

import { TaskService } from "../services";

import { ApiResponse } from "../core";

class TaskController {
  private _business: TaskService = new TaskService();

  public save = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task: TaskDto = req.body;

      const result = await this._business.save(task);

      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      return res.status(HttpStatusCode.OK).json(response);
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

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: TaskDto[] = await this._business.getAll();

      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public archive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = +req.query.Id;

      const result: boolean = await this._business.archive(id);

      const response: IResponse = {
        ...ApiResponse,
        result,
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
      const id: number = +req.body.id;

      const result: boolean = await this._business.deArchive(id);

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

Object.seal(TaskController);
export { TaskController };
