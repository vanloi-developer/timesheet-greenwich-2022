import { BaseRepository } from "./base";

import { ITask } from "../../interfaces";
import { TaskDto } from "src/app/dto/requests";
import { TaskSchema } from "../schemas";

class TaskRepository extends BaseRepository<ITask> {
  constructor() {
    super("tasks", TaskSchema);
  }

  public getAll = async () => {
    return await this._model.find({}, "name id");
  };

  public archive = async (id: number) => {
    const isActived = await this._model.updateOne(
      { id: id },
      { $set: { isDeleted: true } }
    );

    return true ? isActived : false;
  };

  public deArchive = async (id: number) => {
    const isActived = await this._model.updateOne(
      { id: id },
      { $set: { isDeleted: false } }
    );

    return true ? isActived : false;
  };
}

Object.seal(TaskRepository);
export { TaskRepository };
