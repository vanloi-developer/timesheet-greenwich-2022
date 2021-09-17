import { HttpStatusCode } from "../../enums";

export class ApiError extends Error {
  public _code: HttpStatusCode;
  public message: string;

  constructor(code: HttpStatusCode, message: string) {
    super(message);
    this._code = code;
  }
}
