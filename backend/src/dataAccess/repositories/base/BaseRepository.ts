import { Model, Document, model, Schema } from "mongoose";
import { HttpStatusCode } from "../../../app/enums";
import { ApiError } from "../../../app/core";

/**
 * Lack of interface, need to implement 2 interfaces more, IWrite<T>, IRead<T>
 */
abstract class BaseRepository<T extends Document> {
  public _model;
  constructor(modelName: string, schema: Schema) {
    this._model = model<T>(modelName, schema);
  }

  public save = async (item: T) => {
    try {
      return await item.save();
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Error in repository`);
    }
  };

  public update = async (item: T) => {
    try {
      const id = item.id;

      const isUpdated = await this._model.replaceOne(id, item);

      return isUpdated
        ? isUpdated
        : new ApiError(HttpStatusCode.NOT_FOUND, `Error in repository`);
    } catch (error) {
      throw error;
    }
  };

  public delete = async (id: number) => {
    try {
      const isDeleted = await this._model.deleteOne({ id });

      return true
        ? isDeleted
        : new ApiError(HttpStatusCode.NOT_FOUND, `Error in repository`);
    } catch (error) {
      throw error;
    }
  };

  public findById = async (id: number) => {
    try {
      return await this._model.findOne({ id: id });
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Error in repository`);
    }
  };

  public findByUsername = async (userName: string) => {
    try {
      return await this._model.findOne({ userName });
    } catch (error) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, `Error in repository`);
    }
  };

  public retrieve = async () => {
    try {
      const items = await this._model.find();

      return items
        ? items
        : new ApiError(HttpStatusCode.NOT_FOUND, `Error in repository`);
    } catch (error) {
      throw error;
    }
  };
}

Object.seal(BaseRepository);
export { BaseRepository };
