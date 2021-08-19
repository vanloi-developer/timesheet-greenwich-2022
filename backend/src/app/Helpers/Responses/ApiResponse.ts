import { Response } from "express";
import { ResponseStatus as HttpStatusCode, StatusCode } from "../../Enums";

abstract class ApiResponse {
  constructor(
    protected statusCode: StatusCode,
    protected status: HttpStatusCode,
    protected message: string
  ) {}

  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T
  ): Response {
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  public json(res: Response): Response {
    return this.prepare<ApiResponse>(res, this);
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    // @ts-ignore
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === "undefined") delete clone[i];
    return clone;
  }
}

export = ApiResponse;
