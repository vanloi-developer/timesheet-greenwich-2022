import { ErrorType } from "../Enums";
import  {HttpException}  from "./Http-Exception";

export class InternalError extends HttpException {
  constructor(message = `Internal Server Error`) {
    super(ErrorType.INTERNAL, message);
  }
}
