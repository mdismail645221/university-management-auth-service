import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemisterService } from './academicSemister.service';

const CreateAcademicSemister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemisterData } = req.body;
    const result = await AcademicSemisterService.createAcademicSemister(
      academicSemisterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Successfully created academicSemister Data`,
      data: result,
    });
    next();
  }
);

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
    };

    console.log(paginationOptions);

    // const result = await AcademicSemisterService.getAllSemesters(
    //   paginationOptions
    // );

    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: `Successfully geting academic semester`,
    //   data: result,
    // });
    next();
  }
);

export const academicSemisterControllers = {
  CreateAcademicSemister,
  getAllSemester,
};
