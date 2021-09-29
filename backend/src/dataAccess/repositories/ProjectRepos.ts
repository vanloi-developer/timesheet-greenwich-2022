import { BaseRepository } from "./base";

import { ApiError } from "../../app/core";

import { ProjectSchema } from "../schemas";

import { IProject } from "../../interfaces";

import { HttpStatusCode } from "../../app/enums";

class ProjectRepository extends BaseRepository<IProject> {
  constructor() {
    super("projects", ProjectSchema);
  }

  public findProjectByFilter = async (
    status: number,
    searchKey: string
  ): Promise<IProject[]> => {
    const name = new RegExp(searchKey, "i");

    if (status == 1) {
      return await this._model.find({ status: 1 });
    }

    if (status == 0) {
      return await this._model.find({ status: 0 });
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
      return await this._model.updateOne({ id }, { status: 1 });
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in layer dataAccess, ${error}`
      );
    }
  };

  public active = async (id: number): Promise<boolean> => {
    try {
      return await this._model.updateOne({ id }, { status: 0 });
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
