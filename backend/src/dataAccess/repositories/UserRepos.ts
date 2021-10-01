import { GridParam } from "../../app/dto/requests/GridParam";

import { IProjectUsers, IUser } from "../../interfaces";

import { HttpStatusCode } from "../../app/enums";

import { ProjectUsersRepository } from ".";

import { ApiError } from "../../app/core";

import { UserSchema } from "../schemas";

import { BaseRepository } from "./base";

import { GetUserDto } from "../../app/dto/responses";

import { ACTIVE_USER, DEACTIVE_USER } from "../../app/constants";

class UserRepository extends BaseRepository<IUser> {
  private _projectUsersRepos = new ProjectUsersRepository();
  constructor() {
    super("users", UserSchema);
  }

  public resetPassword = async (
    adminPassword: string,
    id: number,
    newPassword: string
  ) => {
    try {
      if (await this._model.find({ id, password: adminPassword })) {
        return await this._model.updateOne({ id }, { password: newPassword });
      }

      return false;
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Having error in dataAccess: ${error}`
      );
    }
  };

  public deactive = async (id: number) => {
    try {
      return await this._model.updateOne({ id }, { isActive: DEACTIVE_USER });
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Having error in dataAccess: ${error}`
      );
    }
  };

  public active = async (id: number) => {
    try {
      return await this._model.updateOne({ id }, { isActive: ACTIVE_USER });
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        `Having error in dataAccess: ${error}`
      );
    }
  };

  public findManager = async (managerId: number) => {
    try {
      return await this._model.findOne({ managerId });
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in layer dataAccess: ${error}`
      );
    }
  };

  public setAvatar = async (
    id: number,
    avatarPath: string
  ): Promise<string> => {
    try {
      const result = await this._model.updateOne({ id }, { avatarPath });

      if (result) {
        return avatarPath;
      }
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in layer dataAccess: ${error}`
      );
    }
  };

  public findProjectManagers = async (id: number): Promise<string[]> => {
    const pms: string[] = [];

    let members: IProjectUsers[] =
      await this._projectUsersRepos.findByMembersByProjectId(id);

    members = members.filter((member) => {
      return member.type == 1;
    });

    for (let member of members) {
      let user: IUser = await this.findById(member.userId);

      pms.push(user.name);
    }

    return pms;
  };

  public getUserNotPagging = async () => {
    try {
      return await this._model.find(
        {},
        "id name isActive type jobTitle level userCode branch avatarPath"
      );
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in layer dataAccess: ${error}`
      );
    }
  };

  public getAllManager = async (): Promise<GetUserDto[]> => {
    return await this._model.find(
      { managerId: { $ne: 0 } },
      "id name type isActive jobTitle level userCode branch avatarPath"
    );
  };

  public getAllPagging = async (filter: GridParam) => {
    let filterSearch = {};

    for (let item of filter.filterItems) {
      filterSearch[item.propertyName] = item.value;
    }

    const keyword = new RegExp(filter.searchText, "i");

    let items = await this._model
      .find(
        {},
        "id userName name surname emailAddress phoneNumber address isActive fullName roleNames type salary salaryAt startDateAt managerId branch sex creationTime morningWorking allowedLeaveDay userCode jobTitle level registerWorkDay morningStartAt morningEndAt afternoonWorking afternoonEndAt avatarPath"
      )
      .skip(filter.skipCount)
      .limit(filter.maxResultCount)
      .lean();

    return items;
  };
}

Object.seal(UserRepository);
export { UserRepository };
