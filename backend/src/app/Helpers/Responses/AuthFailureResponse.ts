import ApiResponse from "./ApiResponse";
import { ResponseStatus, StatusCode } from "../../Enums";
import msg from "../../constant";

class AuthFailureResponse extends ApiResponse {
  constructor(message = msg.AUTHENTICATE_FAILURE) {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
  }
}

Object.seal(AuthFailureResponse);
export { AuthFailureResponse };
