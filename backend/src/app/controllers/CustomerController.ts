import { GridParam } from "../dto/requests/GridParam";

import { CustomerDto } from "../dto/common/CustomerDto";

import { IResponse } from "../core/responses/interfaces";

import { NextFunction, Request, Response } from "express";

import { SelectCustomerDto, GridResultCustomer } from "../dto/responses";

import { CustomerService } from "../services";

import { HttpStatusCode } from "../enums";

import { ApiResponse } from "../core";

class CustomerController {
  private _business: CustomerService = new CustomerService();

  public save = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const customer: CustomerDto = req.body;

      const result: CustomerDto = await this._business.save(customer);

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
      const result: SelectCustomerDto[] = await this._business.getAll();

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

  public getAllPagging = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filter: GridParam = req.body;

      const result: GridResultCustomer = await this._business.getAllPagging(
        filter
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
}

Object.seal(CustomerController);
export { CustomerController };
