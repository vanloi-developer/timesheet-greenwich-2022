import { ProjectTasksDto } from "src/app/dto/responses";
import { ApiError } from "../../app/core";
import { IProjectTask } from "../../interfaces";
import { ProjectTaskSchema } from "../schemas";
import { BaseRepository } from "./base";

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
      throw new ApiError(400, `Error in repository`);
    }
  };

  public deleteMany = async (projectId: number) => {
    try {
      return await this._model.deleteMany({ projectId });
    } catch (error) {
      throw new ApiError(400, `Error in repository, ${error}`);
    }
  };
}

Object.seal(ProjectTaskRepository);
export { ProjectTaskRepository };
