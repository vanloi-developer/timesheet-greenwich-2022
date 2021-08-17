import ApiResponse from "./ApiResponse";
import { HttpStatusCode } from "../../app/Enums/HttpStatusCode";
import msg from "../../constant";

class AuthenticateFailureResponse extends ApiResponse {
  constructor(message = msg.AUTHENTICATE_FAILURE) {
    super(HttpStatusCode.UNAUTHORIZED, message);
  }
}

Object.seal(AuthenticateFailureResponse);
export = AuthenticateFailureResponse;
