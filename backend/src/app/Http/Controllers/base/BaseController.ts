import { BaseRepository } from "../../../../dataAccess/repositories/base";

export abstract class BaseController<T> {
  public _business: T;

  constructor(business: T) {
    this._business = business;
  }
}
