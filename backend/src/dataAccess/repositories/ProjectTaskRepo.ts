import { BaseRepository } from "./base";

import { ApiError } from "../../app/core";

import { ProjectTaskSchema } from "../schemas";

import { IProjectTask } from "../../interfaces";

import { HttpStatusCode } from "../../app/enums";

import { ProjectTasksDto } from "src/app/dto/responses";

class ProjectTaskRepository extends BaseRepository<IProjectTask> {
  constructor() {
    super("projectTasks", ProjectTaskSchema);
  }

  public findByProjectId = async (
    projectId: number
  ): Promise<ProjectTasksDto[]> => {
    try {
      return await this._model.find({ projectId });
    } catch (error) {
      throw new ApiError(HttpStatusCode.BAD_REQUEST, `Error in repository`);
    }
  };

  public deleteMany = async (projectId: number) => {
    try {
      return await this._model.deleteMany({ projectId });
    } catch (error) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `Error in repository, ${error}`
      );
    }
  };
}

Object.seal(ProjectTaskRepository);
export { ProjectTaskRepository };
