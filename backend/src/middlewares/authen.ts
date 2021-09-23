import { Request, Response, NextFunction } from "express";

const fakeData = {
   error: {
      code: 0,
      details: "Invalid user name or password",
      message: "Login failed!",
      validationErrors: null,
      result: null,
   },
   success: false,
   targetUrl: null,
   unAuthorizedRequest: false,
};

export const authen = (req: Request, res: Response, next: NextFunction) => {
   // console.log("ping");
   // res.status(200).json(fakeData);
   next();
};
