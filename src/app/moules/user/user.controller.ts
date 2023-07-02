import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.services';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { users } = req.body;
    const result = await UserService.createUsers(users);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `successfully created user`,
      data: result,
    });
    next();
  }
);

export const usersControllers = {
  createUser,
};
