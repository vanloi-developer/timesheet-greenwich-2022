import { ErrorType } from "../Enums";
import  {HttpException}  from "./Http-Exception";

export class BadRequestError extends HttpException {
  constructor(message = `Bad Request`) {
    super(ErrorType.BAD_REQUEST, message);
  }
}
