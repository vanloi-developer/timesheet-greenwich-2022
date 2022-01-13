import { HttpStatusCode } from "../../enums";

import { ApiError, ApiResponse } from "..";

import { IResponse } from "../responses/interfaces";

import { NextFunction, Response, Request } from "express";

class Authorization {
  public static confirm =
    (role: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const response: IResponse = {
        ...ApiResponse,

        success: false,

        error: new ApiError(HttpStatusCode.UNAUTHORIZED, `Unauthorized`),
      };

      let roleNames: string[] = req.app.locals.currentUser.roleNames;

      let isPermission: boolean = false;

      for (let roleName of roleNames) {
        if (roleName === role) {
          isPermission = true;

          next();
        }

        new ApiError(HttpStatusCode.UNAUTHORIZED, `Unauthorized`);
      }

      try {
      } catch (error) {
        res.status(HttpStatusCode.UNAUTHORIZED).json(response);
      }

      return role;
    };
}

Object.seal(Authorization);
export { Authorization };
