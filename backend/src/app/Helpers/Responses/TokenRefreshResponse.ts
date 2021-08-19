import ApiResponse from "./ApiResponse";
import { StatusCode, ResponseStatus } from "../../Enums";
import { Response } from "express";

export class TokenRefreshResponse extends ApiResponse {
  constructor(
    message: string,
    private accessToken: string,
    private refreshToken: string
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  json(res: Response): Response {
    return super.prepare<TokenRefreshResponse>(res, this);
  }
}
