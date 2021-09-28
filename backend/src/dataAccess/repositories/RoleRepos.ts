import { BaseRepository } from "./base";

import { IRole } from "../../interfaces";

import { RoleSchema } from "../schemas";
import { ApiError } from "../../app/core";

class RoleRepository extends BaseRepository<IRole> {
  constructor() {
    super("Roles", RoleSchema);
  }

  public getAll = async (query: {
    keyword: string;
    skipCount: number;
    maxResultCount: number;
  }) => {
    try {
      const keyword = new RegExp(query.keyword, "i");

      const totalCount = await this._model.countDocuments({});

      const items = await this._model
        .find({
          $or: [
            { name: keyword },
            { displayName: keyword },
            { description: keyword },
          ],
        })
        .skip(query.skipCount)
        .limit(query.maxResultCount);

      return {
        totalCount,
        items,
      };
    } catch (error) {
      throw new ApiError(400, `Error in layer dataAccess: ${error}`);
    }
  };
}

Object.seal(RoleRepository);
export { RoleRepository };
