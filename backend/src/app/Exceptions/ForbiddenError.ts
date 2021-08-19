import { ErrorType } from "../Enums";
import  {HttpException}  from "./Http-Exception";

export class ForbiddenError extends HttpException {
  constructor(message = `Permission deniedƒ`) {
    super(ErrorType.FORBIDDEN, message);
  }
}
