import ApiResponse from "./ApiResponse";

import { HttpStatusCode } from "../../app/Enums";

class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(HttpStatusCode.SUCCESS, message);
  }
}

Object.seal(SuccessMsgResponse);
export = SuccessMsgResponse;
