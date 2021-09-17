import { TaskModel } from "../../models";
import { TaskRepository } from "../../dataAccess/repositories";
import { ApiError } from "../core";
import { TaskDto } from "../dto/requests";
import { HttpStatusCode } from "../enums";
import { BaseService } from "./base";

class TaskService extends BaseService<TaskRepository> {
  constructor() {
    super(new TaskRepository());
  }

  public save = async (item: TaskDto) => {
    try {
      return await this._repos.save(new TaskModel(item));
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Having error in business`);
    }
  };

  public delete = async (id: number) => {
    try {
      console.log(id);
      return await this._repos.delete(id);
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Having error in business`);
    }
  };

  public getAll = async () => {
    try {
      return await this._repos.retrieve();
    } catch (error) {
      throw error;
    }
  };

  public archive = async (id: number) => {
    try {
      return await this._repos.archive(id);
    } catch (error) {
      throw error;
    }
  };

  public deArchive = async (id: number) => {
    try {
      return await this._repos.deArchive(id);
    } catch (error) {
      throw error;
    }
  };
}

Object.seal(TaskService);
export { TaskService };
