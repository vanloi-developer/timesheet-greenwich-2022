import { ApiError } from "../core";

import { BaseService } from "./base";

import { TaskRepository } from "../../dataAccess/repositories";

import { TaskDto } from "../dto/requests";

import { HttpStatusCode } from "../enums";

class TaskService extends BaseService<TaskRepository> {
  constructor() {
    super(new TaskRepository());
  }

  public save = async (item: TaskDto): Promise<TaskDto> => {
    try {
      return await this._repos.save(item);
    } catch (error) {
      throw error;
    }
  };

  public delete = async (id: number): Promise<boolean> => {
    try {
      return await this._repos.delete(id);
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Having error in business`);
    }
  };

  public getAll = async (): Promise<TaskDto[]> => {
    try {
      return await this._repos.getAll();
    } catch (error) {
      throw error;
    }
  };

  public archive = async (id: number): Promise<boolean> => {
    try {
      return await this._repos.archive(id);
    } catch (error) {
      throw error;
    }
  };

  public deArchive = async (id: number): Promise<boolean> => {
    try {
      return await this._repos.deArchive(id);
    } catch (error) {
      throw error;
    }
  };
}

Object.seal(TaskService);
export { TaskService };
