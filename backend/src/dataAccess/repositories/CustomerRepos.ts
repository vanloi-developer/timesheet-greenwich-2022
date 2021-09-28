import { BaseRepository } from "./base";

import { ICustomer } from "../../interfaces";

import { CustomerSchema } from "../schemas";
import { GridParam } from "../../app/dto/requests/GridParam";
import { ApiError } from "../../app/core";
import { CustomerDto } from "src/app/dto/common/CustomerDto";

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
    try {
      return await this._model.find({}, "id name");
    } catch (error) {
      throw new ApiError(400, `Error in layer dataAccess: ${error}`);
    }
  };

  public getAllPagging = async (filter: GridParam) => {
    try {
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
    } catch (error) {
      throw new ApiError(400, `Error in layer dataAccess: ${error}`);
    }
  };
}

Object.seal(CustomerRepository);
export { CustomerRepository };
