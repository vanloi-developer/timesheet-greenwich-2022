import ApiResponse from "./ApiResponse";

import { StatusCode, ResponseStatus } from "../../Enums";

export class InternalErrorResponse extends ApiResponse {
  constructor(message = "Internal Error") {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}
