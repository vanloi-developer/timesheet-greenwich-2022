import ApiResponse from "./ApiResponse";
import { StatusCode, ResponseStatus } from "../../Enums";
import { Response } from "express";

class NotFoundResponse extends ApiResponse {
  private url: string | undefined;

  constructor(message = "Not Found Url") {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
  }
}

export  {NotFoundResponse};
