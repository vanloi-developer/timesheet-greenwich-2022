import { NextFunction, Request, Response } from "express";

import { IResponse } from "../core/responses/interfaces";
import { CreateRoleDto } from "../dto/requests/role/CreateRoleDto";

import { HttpStatusCode } from "../enums";
import { RoleService } from "../services";
import { BaseController } from "./base";

class RoleController extends BaseController<RoleService> {
  constructor() {
    super(new RoleService());
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role: CreateRoleDto = req.body;

      const result = await this._business.create(role);

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
      const query = {
        keyword: String(req.query.Keyword),
        skipCount: +req.query.SkipCount,
        maxResultCount: +req.query.MaxResultCount,
      };

      const result = await this._business.getAll(query);

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
      const id: number = +req.query.Id;

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
}

Object.seal(RoleController);
export { RoleController };
