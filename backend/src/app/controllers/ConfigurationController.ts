import { Request, Response } from "express";

class ConfigurationController {
  async getWorkingTimeConfigAllBranch(req: Request, res: Response) {
    const response = {
      "0": {
        morningStartAt: "08:30",
        morningEndAt: "12:00",
        afternoonStartAt: "13:00",
        afternoonEndAt: "17:30",
        morningWorking: "3.5",
        afternoonWorking: "4.5",
        id: 0,
      },
      "1": {
        morningStartAt: "08:00",
        morningEndAt: "12:00",
        afternoonStartAt: "13:00",
        afternoonEndAt: "17:00",
        morningWorking: "4",
        afternoonWorking: "4",
        id: 0,
      },
      "2": {
        morningStartAt: "08:30",
        morningEndAt: "12:00",
        afternoonStartAt: "13:00",
        afternoonEndAt: "17:30",
        morningWorking: "3.5",
        afternoonWorking: "4.5",
        id: 0,
      },
      "3": {
        morningStartAt: "08:30",
        morningEndAt: "12:00",
        afternoonStartAt: "13:00",
        afternoonEndAt: "17:30",
        morningWorking: "3.5",
        afternoonWorking: "4.5",
        id: 0,
      },
    };

    return res.status(200).json(response);
  }
}

Object.seal(ConfigurationController);
export { ConfigurationController };
