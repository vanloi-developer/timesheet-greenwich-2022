import {
  GetProjectDto,
  ProjectDto,
  ProjectIncludingTaskDto,
} from "../dto/responses";

import { ApiResponse } from "../core/responses";

import { Request, Response, NextFunction } from "express";

import { IResponse } from "../core/responses/interfaces";

import { ProjectService } from "../services";

import { HttpStatusCode } from "../enums";

class ProjectController {
  private _business: ProjectService = new ProjectService();

  public save = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: ProjectDto = await this._business.save(req.body);

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
      const status: number = +req.query.status;

      const search: string = String(req.query.seach);

      const result: GetProjectDto[] = await this._business.getAll(
        status,
        search
      );

      const response = {
        ...ApiResponse,
        result,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public inActive = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: number = +req.body.id;

      const result: boolean = await this._business.inActive(id);

      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public active = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = +req.body.id;

    const result: boolean = await this._business.active(id);

    const response: IResponse = {
      ...ApiResponse,
      result,
    };

    return res.status(HttpStatusCode.OK).json(response);
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = +req.query.Id;

    const result: boolean = await this._business.delete(id);

    const response: IResponse = {
      ...ApiResponse,
      result,
    };

    return res.status(HttpStatusCode.OK).json(response);
  };

  public get = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = +req.query.input;

    const result: ProjectDto = await this._business.get(id);

    const response: IResponse = {
      ...ApiResponse,
      result,
    };

    return res.status(HttpStatusCode.OK).json(response);
  };

  public getProjectsIncludingTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId: number = req.app.locals.currentUser.id;

    const result: ProjectIncludingTaskDto[] =
      await this._business.getProjectIncludingTasks(userId);

    const response: IResponse = {
      ...ApiResponse,
      result,
    };

    return res.status(HttpStatusCode.OK).json(response);
  };

  public getFilter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = await this._business.getFilter();

    const response: IResponse = {
      ...ApiResponse,
      result,
    };

    return res.status(HttpStatusCode.OK).json(response);
  };

  public getProjectPM = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = await this._business.getProjectPM();

    const response: IResponse = {
      ...ApiResponse,
      result,
    };

    return res.status(HttpStatusCode.OK).json(response);
  };

  public getProjectUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = await this._business.getProjectUser();
    const response: IResponse = {
      ...ApiResponse,
      result,
    };

    return res.status(HttpStatusCode.OK).json(response);
  };
}

Object.seal(ProjectController);
export { ProjectController };
