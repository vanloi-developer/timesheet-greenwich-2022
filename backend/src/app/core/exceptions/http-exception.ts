import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../enums";
import { DataResponse } from "../responses";
import { IResponse } from "../responses/interfaces";
import { ApiError } from "./ApiError";

function handlingError(
  _error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const code: HttpStatusCode = _error._code;

  const message: string = _error.message;

  const error = {
    code,
    message,
    details: _error.stack,
    validationResult: null,
  };

  const response = {
    error,

    result: null,

    success: false,

    targetUrl: null,

    unAuthorizedRequest: false,

    __abp: true,
  };

  return res.status(code).json(response);
}

function catch404(req: Request, res: Response) {
  const message = `${req.method} ${req.url} is not found!`;

  const code = HttpStatusCode.NOT_FOUND;

  const _error = {
    code,
    message,
  };

  const response = {
    _error,
  };

  return res.status(code).json(response);
}

export { handlingError, catch404 };
