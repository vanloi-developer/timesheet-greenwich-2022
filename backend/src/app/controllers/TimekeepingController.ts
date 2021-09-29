import { Request, Response } from "express";

class TimekeepingController {
  async getMyDetails(req: Request, res: Response) {
    const response = [
      {
        timekeepingId: 0,
        userId: 0,
        userName: "string",
        userType: 0,
        userEmail: "string",
        avatarPath: "string",
        branch: 0,
        date: "2021-09-29T01:55:35.435Z",
        registrationTimeStart: "string",
        registrationTimeEnd: "string",
        checkIn: "string",
        checkOut: "string",
        resultCheckIn: 0,
        resultCheckOut: 0,
        editByUserId: 0,
        editByUserName: "string",
        status: 0,
        userNote: "string",
        noteReply: "string",
      },
    ];

    return res.status(200).json(response);
  }
}

Object.seal(TimekeepingController);
export { TimekeepingController };
