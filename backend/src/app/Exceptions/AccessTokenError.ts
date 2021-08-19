import { ErrorType } from "../Enums";
import {HttpException} from "./Http-Exception";

export class AccessTokenError extends HttpException {
  constructor(message = `Invalid access token`) {
    super(ErrorType.ACCESS_TOKEN, message);
  }
}
