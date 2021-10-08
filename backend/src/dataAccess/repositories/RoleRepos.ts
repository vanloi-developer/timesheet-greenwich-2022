import { BaseRepository } from "./base";

import { IRole } from "../../interfaces";

import { RoleSchema } from "../schemas";

import { RoleDto } from "src/app/dto/responses";

class RoleRepository extends BaseRepository<IRole> {
  constructor() {
    super("Roles", RoleSchema);
  }

  public getRoles = async (): Promise<RoleDto[]> => {
    return await this._model.find();
  };

  public getAll = async (query: {
    keyword: string;
    skipCount: number;
    maxResultCount: number;
  }) => {
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
  };
}

Object.seal(RoleRepository);
export { RoleRepository };
