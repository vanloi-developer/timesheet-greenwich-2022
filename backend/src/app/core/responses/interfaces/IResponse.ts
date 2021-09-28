import { ApiError } from "../../exceptions/ApiError";

export interface IResponse  {
  error?: ApiError | null;

  result?: any;

  success: boolean;

  targetUrl: string | null;

  unAuthorizedRequest: boolean;

  __abp: boolean;
}
