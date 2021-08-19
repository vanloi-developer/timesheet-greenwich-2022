import ApiResponse from "./ApiResponse";
import { StatusCode, ResponseStatus } from "../../Enums";

export class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
  }
}
