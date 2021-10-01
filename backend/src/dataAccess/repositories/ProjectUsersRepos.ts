import { ProjectUsersDto } from "../../app/dto/responses";

import { BaseRepository } from "../repositories/base";

import { IProjectUsers } from "../../interfaces";

import { HttpStatusCode } from "../../app/enums";

import { ProjectUsersSchema } from "../schemas";

import { ApiError } from "../../app/core";

class ProjectUsersRepository extends BaseRepository<IProjectUsers> {
  constructor() {
    super("projectUsers", ProjectUsersSchema);
  }

  public findByProjectId = async (projectId: number) => {
    return await this._model.find({ projectId });
  };

  public findByUserId = async (userId: number) => {
    return await this._model.find({ userId });
  };

  public deleteMany = async (projectId: number) => {
    try {
      return await this._model.deleteMany({ projectId });
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in repository: ${error}`
      );
    }
  };

  public findActiveMembers = async (projectId: number): Promise<number> => {
    let members: ProjectUsersDto[] = await this._model.find({ projectId });

    members = members.filter((member) => {
      return member.type !== 3;
    });

    return members.length;
  };

  public findByMembersByProjectId = async (
    projectId: number
  ): Promise<IProjectUsers[]> => {
    return await this._model.find({ projectId });
  };

  public create = async (projectUser: any, projectId: number) => {
    const item: IProjectUsers = {
      ...projectUser,
      projectId,
    };

    return await this.save(item);
  };
}

Object.seal(ProjectUsersRepository);
export { ProjectUsersRepository };
