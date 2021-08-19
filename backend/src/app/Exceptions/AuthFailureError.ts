import { ErrorType } from "../Enums";
import  {HttpException}  from "./Http-Exception";

export class AuthFailureError extends HttpException {
  constructor(message = `Invalid Credentials`) {
    super(ErrorType.UNAUTHORIZED, message);
  }
}
