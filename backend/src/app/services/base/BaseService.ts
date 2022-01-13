export abstract class BaseService<T> {
  public _repos: T;

  constructor(repos: T) {
    this._repos = repos;
  }
}
