import { Response } from "express";
import { HttpStatusCode } from "../../app/Enums/HttpStatusCode";

abstract class ApiResponse {
  constructor(public statusCode: HttpStatusCode, public message: String) {}

  public prepare<T extends ApiResponse>(res: Response, response: T): Response {
    return res.status(this.statusCode).json(ApiResponse.santinize(response));
  }

  public json(res: Response): Response {
    return this.prepare<ApiResponse>(res, this);
  }

  public static santinize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;

    Object.assign(clone, response);

    // @ts-ignore
    delete clone.statusCode;
    for (const i in clone) if (typeof clone[i] === "undefined") delete clone[i];
    return clone;
  }
}

export = ApiResponse;
