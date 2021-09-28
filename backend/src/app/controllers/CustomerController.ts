import { NextFunction, Request, Response } from "express";

import { IResponse } from "../core/responses/interfaces";
import { CustomerDto } from "../dto/common/CustomerDto";
import { GridParam } from "../dto/requests/GridParam";

import { CustomerService } from "../services";

import { BaseController } from "./base";

class CustomerController extends BaseController<CustomerService> {
  constructor() {
    super(new CustomerService());
  }

  public save = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customer: CustomerDto = req.body;

      const result = await this._business.save(customer);

      const response: IResponse = {
        error: null,

        result,

        success: true,

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
      const result = await this._business.getAll();
      const response: IResponse = {
        error: null,

        result,

        success: true,

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

        success: true,

        targetUrl: null,

        unAuthorizedRequest: false,

        __abp: true,
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getAllPagging = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filter: GridParam = req.body;

      const result = await this._business.getAllPagging(filter);

      const response: IResponse = {
        error: null,

        result,

        success: true,

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

Object.seal(CustomerController);
export { CustomerController };
