import ApiResponse from "./ApiResponse";

import { HttpStatusCode } from "../../app/Enums";

import { Response } from "express";

class SuccessResponse extends ApiResponse {
  constructor(message: string) {
    super(HttpStatusCode.SUCCESS, message);
  }

  json(res: Response): Response {
    return super.prepare<SuccessResponse>(res, this);
  }
}

Object.seal(SuccessResponse);

export = SuccessResponse;
