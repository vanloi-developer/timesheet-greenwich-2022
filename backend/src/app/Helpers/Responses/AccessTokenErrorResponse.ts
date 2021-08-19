import { Response } from "express";
import ApiResponse from "./ApiResponse";
import { StatusCode, ResponseStatus } from "../../Enums";

export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = "refresh_token";

  constructor(message = "Access token invalid") {
    super(
      StatusCode.INVALID_ACCESS_TOKEN,
      ResponseStatus.UNAUTHORIZED,
      message
    );
  }

  json(res: Response): Response {
    res.setHeader("instruction", this.instruction);
    return super.prepare<AccessTokenErrorResponse>(res, this);
  }
}
