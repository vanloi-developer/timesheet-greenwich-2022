import { IRead, IWrite } from "../interfaces";

import * as mongoose from "mongoose";

abstract class BaseRepository<T extends mongoose.Document>
  implements IRead<T>, IWrite<T>
{
  public _model: mongoose.Model<T>;

  constructor(model: mongoose.Model<T>) {
    this._model = model;
  }

  public async retrieve(): Promise<T[]> {
    return await this._model.find();
  }

  public async findById(_id: string): Promise<T> {
    return await this._model.findById(_id);
  }

  public async create(item: T): Promise<T> {
    return await item.save();
  }
}

Object.seal(BaseRepository);
export { BaseRepository };
