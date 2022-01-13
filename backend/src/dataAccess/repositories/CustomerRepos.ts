import { BaseRepository } from "./base";

import { ApiError } from "../../app/core";

import { CustomerSchema } from "../schemas";

import { ICustomer } from "../../interfaces";

import { CustomerDto } from "src/app/dto/common/CustomerDto";

import { GridParam } from "../../app/dto/requests/GridParam";

class CustomerRepository extends BaseRepository<ICustomer> {
  constructor() {
    super("customers", CustomerSchema);
  }

  public findCustomerByCustomerId = async (
    id: number
  ): Promise<CustomerDto> => {
    return await this._model.findOne({ id }, "name");
  };

  public getAll = async () => {
    return await this._model.find({}, "id name");
  };

  public getAllPagging = async (filter: GridParam) => {
    const keyword = new RegExp(filter.searchText, "i");

    let items = await this._model
      .find({ $or: [{ name: keyword }, { address: keyword }] })
      .select("name address id")
      .skip(filter.skipCount)
      .limit(filter.maxResultCount);

    const totalCount = await items.length;

    return {
      totalCount,
      items,
    };
  };
}

Object.seal(CustomerRepository);
export { CustomerRepository };
