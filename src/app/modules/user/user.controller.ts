import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.services';

const createUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // user data reviced and responsed
    const { user } = await req.body;
    const result = await UserService.createUsers(user);
    res.status(200).json({
      statusCode: 400,
      success: true,
      message: `successfully created user`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const usersControllers = {
  createUser,
};
