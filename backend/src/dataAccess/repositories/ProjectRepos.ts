import { BaseRepository } from "./base";

import { ProjectSchema } from "../schemas";

import { IProject } from "../../interfaces";

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
    return await this.save(item);
  };

  public get = async (id: number): Promise<IProject> => {
    return await this._model.findOne({ id });
  };

  public inActive = async (id: number): Promise<boolean> => {
    return await this._model.updateOne({ id }, { status: INACTIVE_PROJECT });
  };

  public active = async (id: number): Promise<boolean> => {
    return await this._model.updateOne({ id }, { status: ACTIVE_PROJECT });
  };

  public getProjectIncludingTasks = async () => {};

  public getProjectPM = async () => {};

  public getProjectUser = async () => {};

  public getFilter = async () => {};
}

Object.seal(ProjectRepository);
export { ProjectRepository };
