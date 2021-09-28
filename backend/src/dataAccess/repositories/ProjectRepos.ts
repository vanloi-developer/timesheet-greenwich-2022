import { GetProjectDto } from "../../app/dto/responses";
import { CustomerRepository } from ".";
import { ApiError } from "../../app/core";
import { IProject } from "../../interfaces";
import { ProjectSchema } from "../schemas";
import { BaseRepository } from "./base";
import { ProjectDto } from "src/app/dto/common/ProjectDto";

class ProjectRepository extends BaseRepository<IProject> {
  private _customerRepos = new CustomerRepository();

  constructor() {
    super("projects", ProjectSchema);
  }

  public findProjectByFilter = async (
    status: number,
    searchKey: string
  ): Promise<ProjectDto[]> => {
    const name = new RegExp(searchKey, "i");

    if (status == 1) {
      return await this._model.find({ status: 1 });
    }

    if (status == 0) {
      return await this._model.find({ status: 0 });
    }

    return await this.retrieve();
  };

  public create = async (item: IProject) => {
    try {
      const project = await this.save(item);
    } catch (error) {
      throw new ApiError(400, `Error in layer dataAccess, ${error}`);
    }
  };

  public get = async (id: number) => {
    try {
      return await this._model.findOne({ id });
    } catch (error) {
      throw new ApiError(400, `Error in layer dataAccess, ${error}`);
    }
  };

  public inActive = async (id: number) => {
    try {
      return await this._model.updateOne({ id }, { status: 1 });
    } catch (error) {
      throw new ApiError(400, `Error in layer dataAccess, ${error}`);
    }
  };

  public active = async (id: number) => {
    try {
      return await this._model.updateOne({ id }, { status: 0 });
    } catch (error) {
      throw new ApiError(400, `Error in layer dataAccess, ${error}`);
    }
  };

  public getProjectIncludingTasks = async () => {};

  public getProjectPM = async () => {};

  public getProjectUser = async () => {};

  public getFilter = async () => {};
}

Object.seal(ProjectRepository);
export { ProjectRepository };
