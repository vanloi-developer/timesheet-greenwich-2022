import ApiResponse from "./ApiResponse";
import { StatusCode, ResponseStatus } from "../../Enums";

class ForbidenResponse extends ApiResponse {
  constructor(message = "Forbidden") {
    super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
  }
}

export { ForbidenResponse };
