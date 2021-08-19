import { Response } from "express";
import config from "../../configs/app";

import {
  AuthFailureResponse,
  AccessTokenErrorResponse,
  InternalErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
  ForbidenResponse,
} from "../Helpers/Responses";

import { ErrorType } from "../Enums";

abstract class HttpException extends Error {
  constructor(public type: ErrorType, public message: string = "Error") {
    super(type);
  }

  public static handle(error: HttpException, res: Response): Response {
    switch (error.type) {
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(error.message).json(res);

      case ErrorType.INTERNAL:
        return new InternalErrorResponse(error.message).json(res);

      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(error.message).json(res);

      case ErrorType.ACCESS_TOKEN:
        return new AccessTokenErrorResponse(error.message).json(res);

      case ErrorType.NOT_FOUND:
      case ErrorType.NO_DATA:
      case ErrorType.NO_DATA:
        return new NotFoundResponse(error.message).json(res);

      case ErrorType.FORBIDDEN:
        return new ForbidenResponse(error.message).json(res);

      default: {
        let message = error.message;
        // Do not send failure message in production as it may send sensitive data
        if (config.NODE_ENV === "production")
          message = "Something wrong happened.";
        return new InternalErrorResponse(message).json(res);
      }
    }
  }
}

export {HttpException};
