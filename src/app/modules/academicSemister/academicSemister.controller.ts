import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { filterAbleFields } from './academicSemister.constant';
import { AcademicSemisterService } from './academicSemister.service';
import { IAcademySemister } from './academySemister.interface';

// saved createdSemester in Mongodb
const createSemester = catchAsync(async (req: Request, res: Response) => {
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
});

const academicSingleSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log({ id });

    const result = await AcademicSemisterService.getSingleSemesterService(id);

    sendResponse<IAcademySemister>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retirived successfully',
      data: result,
    });
  }
);

// all get semesterFileds
const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterAbleFields);
  const paginationOptions = pick(req.query, paginationsFields);

  const result = await AcademicSemisterService.getAllSemesters(
    filters,
    paginationOptions
  );

  // response funtion. which common resposed funtions
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'getAllSemester retirived successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const academicSemisterControllers = {
  createSemester,
  getAllSemester,
  academicSingleSemester,
};
