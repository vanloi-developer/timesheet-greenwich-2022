import { HttpStatusCode } from "../../enums";

export class ApiError extends Error {
  public code: HttpStatusCode;

  public message: string;

  constructor(_code: HttpStatusCode, message: string) {
    super(message);
    this.code = _code;
  }
}
