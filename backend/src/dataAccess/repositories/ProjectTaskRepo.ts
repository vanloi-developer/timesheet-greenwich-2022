import { BaseRepository } from "./base";

import { ProjectTaskSchema } from "../schemas";

import { IProjectTask } from "../../interfaces";

import { ProjectTasksDto } from "src/app/dto/responses";

class ProjectTaskRepository extends BaseRepository<IProjectTask> {
  constructor() {
    super("projectTasks", ProjectTaskSchema);
  }

  public findByProjectId = async (
    projectId: number
  ): Promise<ProjectTasksDto[]> => {
    return await this._model.find({ projectId });
  };

  public deleteMany = async (projectId: number) => {
    return await this._model.deleteMany({ projectId });
  };
}

Object.seal(ProjectTaskRepository);
export { ProjectTaskRepository };
