import ApiResponse from "./ApiResponse";
import { StatusCode, ResponseStatus } from "../../Enums";

export class BadRequestResponse extends ApiResponse {
  constructor(message = "Bad Parameters") {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}
