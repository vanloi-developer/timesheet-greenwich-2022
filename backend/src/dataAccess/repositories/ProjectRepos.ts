import { BaseRepository } from "./base";

import { ApiError } from "../../app/core";

import { ProjectSchema } from "../schemas";

import { IProject } from "../../interfaces";

import { HttpStatusCode } from "../../app/enums";

import { ACTIVE_PROJECT, INACTIVE_PROJECT } from "../../app/constants";

class ProjectRepository extends BaseRepository<IProject> {
  constructor() {
    super("projects", ProjectSchema);
  }

  public findProjectByFilter = async (
    status: number,
    searchKey: string
  ): Promise<IProject[]> => {
    const name = new RegExp(searchKey, "i");

    if (status == INACTIVE_PROJECT) {
      return await this._model.find({ status: INACTIVE_PROJECT });
    }

    if (status == ACTIVE_PROJECT) {
      return await this._model.find({ status: ACTIVE_PROJECT });
    }

    return await this.retrieve();
  };

  public create = async (item: IProject): Promise<IProject> => {
    try {
      return await this.save(item);
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in layer dataAccess, ${error}`
      );
    }
  };

  public get = async (id: number): Promise<IProject> => {
    try {
      return await this._model.findOne({ id });
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in layer dataAccess, ${error}`
      );
    }
  };

  public inActive = async (id: number): Promise<boolean> => {
    try {
      return await this._model.updateOne({ id }, { status: INACTIVE_PROJECT });
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in layer dataAccess, ${error}`
      );
    }
  };

  public active = async (id: number): Promise<boolean> => {
    try {
      return await this._model.updateOne({ id }, { status: ACTIVE_PROJECT });
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in layer dataAccess, ${error}`
      );
    }
  };

  public getProjectIncludingTasks = async () => {};

  public getProjectPM = async () => {};

  public getProjectUser = async () => {};

  public getFilter = async () => {};
}

Object.seal(ProjectRepository);
export { ProjectRepository };
