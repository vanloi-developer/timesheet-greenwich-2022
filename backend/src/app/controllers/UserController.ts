import { Request, NextFunction, Response } from "express";

import {
  GetAllUserDto,
  GetUserDto,
  PagedResultRoleDto,
} from "../dto/responses";

import { IResponse } from "../core/responses/interfaces";

import { GridParam } from "../dto/requests/GridParam";

import { UserDTO } from "../dto/common/UserDto";

import { CreateUserDTO } from "../dto/requests";

import { UserService } from "../services";

import { HttpStatusCode } from "../enums";

import { BaseController } from "./base";

import { ApiResponse } from "../core";

class UserController extends BaseController<UserService> {
  constructor() {
    super(new UserService());
  }

  public getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: PagedResultRoleDto = await this._business.getRoles();

      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public updateOwnAvatar = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: number = +req.app.locals.currentUser.id;

      const avatarPath: string = `/avatars/${req.file.filename}`;

      const result: string = await this._business.updateOwnAvatar(
        userId,
        avatarPath
      );

      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getAllPagging = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filter: GridParam = req.body;

      const result = await this._business.getAllPagging(filter);

      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: CreateUserDTO = req.body;

      const result: UserDTO = await this._business.create(user);

      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getUserNotPagging = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result: GetUserDto[] = await this._business.getUserNotPagging();

      const response: IResponse = {
        ...ApiResponse,
        result,
      };
      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getAllManager = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result: GetUserDto[] = await this._business.getAllManager();

      const response: IResponse = {
        ...ApiResponse,
        result,
      };

      return res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  };
}

Object.seal(UserController);
export { UserController };