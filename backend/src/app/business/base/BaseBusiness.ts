export abstract class BaseBusiness<T> {
  public _repos: T;

  constructor(repos: T) {
    this._repos = repos;
  }
}
