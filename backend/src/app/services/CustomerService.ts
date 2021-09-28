import { BaseService } from "./base";

import { CustomerRepository } from "../../dataAccess/repositories";

import { CustomerDto } from "../dto/common/CustomerDto";
import { ApiError } from "../core";
import { GridParam } from "../dto/requests/GridParam";

class CustomerService extends BaseService<CustomerRepository> {
  constructor() {
    super(new CustomerRepository());
  }

  public save = async (item: CustomerDto) => {
    try {
      return await this._repos.save(item);
    } catch (error) {
      throw new ApiError(400, `error in business logic: ${error}`);
    }
  };

  public getAll = async () => {
    try {
      return await this._repos.getAll();
    } catch (error) {
      throw new ApiError(400, `error in business logic: ${error}`);
    }
  };

  public delete = async (id: number) => {
    try {
      return await this._repos.delete(id);
    } catch (error) {
      throw new ApiError(400, `error in business logic: ${error}`);
    }
  };

  public getAllPagging = async (filter: GridParam) => {
    try {
      return await this._repos.getAllPagging(filter);
    } catch (error) {
      throw new ApiError(400, `Error in business logic: ${error}`);
    }
  };
}

Object.seal(CustomerService);
export { CustomerService };
