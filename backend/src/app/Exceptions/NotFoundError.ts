import { ErrorType } from "../Enums";
import  {HttpException}  from "./Http-Exception";

export class NotFoundError extends HttpException {
  constructor(message = `Not Found`) {
    super(ErrorType.NOT_FOUND, message);
  }
}
