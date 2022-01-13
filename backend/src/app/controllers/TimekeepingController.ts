import { Request, Response } from "express";

import { FAKE_TIMEKEEPING } from "../constants";

import { HttpStatusCode } from "../enums";

class TimekeepingController {
  async getMyDetails(req: Request, res: Response) {
    const response = [FAKE_TIMEKEEPING, FAKE_TIMEKEEPING];

    return res.status(HttpStatusCode.OK).json(response);
  }
}

Object.seal(TimekeepingController);
export { TimekeepingController };
