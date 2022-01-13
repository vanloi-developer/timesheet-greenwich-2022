import { Request, Response } from "express";

import { CONFIGURATION_WORKING_TIME } from "../constants";

import { HttpStatusCode } from "../enums";

class ConfigurationController {
  async getWorkingTimeConfigAllBranch(req: Request, res: Response) {
    const response = CONFIGURATION_WORKING_TIME;

    return res.status(HttpStatusCode.OK).json(response);
  }
}

Object.seal(ConfigurationController);
export { ConfigurationController };
