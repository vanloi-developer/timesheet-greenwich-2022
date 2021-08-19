import ApiResponse from "./ApiResponse";

import { StatusCode, ResponseStatus } from "../../Enums";

import { Response } from "express";

export class SuccessResponse<T> extends ApiResponse {
  constructor(message: string, private data: T) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  json(res: Response): Response {
    return super.prepare<SuccessResponse<T>>(res, this);
  }
}
