import { GridResultCustomer } from "../dto/responses/customer/GridResultCustomer";

import { CustomerRepository } from "../../dataAccess/repositories";

import { CustomerDto } from "../dto/common/CustomerDto";

import { GridParam } from "../dto/requests/GridParam";

import { HttpStatusCode } from "../enums";

import { BaseService } from "./base";

import { ApiError } from "../core";

class CustomerService extends BaseService<CustomerRepository> {
  constructor() {
    super(new CustomerRepository());
  }

  public save = async (item: CustomerDto): Promise<CustomerDto> => {
    try {
      return await this._repos.save(item);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `error in business logic: ${error}`
      );
    }
  };

  public getAll = async (): Promise<CustomerDto[]> => {
    try {
      return await this._repos.getAll();
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `error in business logic: ${error}`
      );
    }
  };

  public delete = async (id: number): Promise<boolean> => {
    try {
      return await this._repos.delete(id);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `error in business logic: ${error}`
      );
    }
  };

  public getAllPagging = async (
    filter: GridParam
  ): Promise<GridResultCustomer> => {
    try {
      return await this._repos.getAllPagging(filter);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in business logic: ${error}`
      );
    }
  };
}

Object.seal(CustomerService);
export { CustomerService };
