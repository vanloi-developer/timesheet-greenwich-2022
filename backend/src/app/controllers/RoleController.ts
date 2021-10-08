import { RoleService } from "../services";

import { NextFunction, Request, Response } from "express";

import { CreateRoleDto } from "../dto/requests/role/CreateRoleDto";

import { RoleDto, PagedResultRoleDto } from "../dto/responses/";

import { IResponse } from "../core/responses/interfaces";

import { HttpStatusCode } from "../enums";

import { ApiResponse } from "../core";

class RoleController {
  private _business: RoleService = new RoleService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role: CreateRoleDto = req.body;

      const result: RoleDto = await this._business.create(role);

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
      const query = {
        keyword: String(req.query.Keyword),
        skipCount: +req.query.SkipCount,
        maxResultCount: +req.query.MaxResultCount,
      };

      const result: PagedResultRoleDto = await this._business.getAll(query);

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
}

Object.seal(RoleController);
export { RoleController };
