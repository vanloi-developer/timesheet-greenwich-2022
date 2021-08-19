import ApiResponse from "./ApiResponse";

import { StatusCode, ResponseStatus } from "../../Enums";

export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}
