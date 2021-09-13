import { Request, Response, NextFunction } from "express";
import { HttpError } from "./http-error";

export const handleError = (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: number = error.code || 500;
  const message: string =
    error.message || "Internal server error, something went wrong.";
  const response = {
    result: null,
    targetUrl: null,
    success: false,
    unAuthorizedRequest: false,
    __abp: true,
    error: {
      code: status,
      message,
      details: error.stack,
      validationErrors: null,
    },
  };

  return res.status(status).json(response);
};

export const handleNotFoundPage = (req: Request, res: Response) => {
  const response = {
    result: null,
    targetUrl: null,
    success: false,
    unAuthorizedRequest: false,
    __abp: true,
    error: {
      code: 404,
      message: `${req.method} ${req.url} is not found.`,
      details: null,
      validationErrors: null,
    },
  };
  return res.json(response);
};
