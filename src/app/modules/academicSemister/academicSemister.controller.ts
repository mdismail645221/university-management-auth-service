import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemisterService } from './academicSemister.service';
import { IAcademySemister } from './academySemister.interface';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemisterService.createAcademicSemister(
      academicSemesterData
    );

    sendResponse<IAcademySemister>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully!',
      data: result,
    });
    next();
  }
);

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationsFields);

    const result = await AcademicSemisterService.getAllSemesters(
      paginationOptions
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'getAllSemester get retirived successfully',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

export const academicSemisterControllers = {
  createSemester,
  getAllSemester,
};
