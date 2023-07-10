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

// find single semester service
const academicSingleSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AcademicSemisterService.getSingleSemesterService(id);

    sendResponse<IAcademySemister>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retirived successfully',
      data: result,
    });
  }
);

//find all get academic semester
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

// update semester services
const academicUpdateSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const updatedData = req?.body;

    const result = await AcademicSemisterService.academicUpdatedSemesterService(
      id,
      updatedData
    );

    sendResponse<IAcademySemister>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester updated successfully',
      data: result,
    });
  }
);

// deleted semester
const deletedSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req?.params?.id;

  const result = await AcademicSemisterService.deletedSemesterService(id);

  sendResponse<IAcademySemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted successfully',
    data: result,
  });
});

export const academicSemisterControllers = {
  createSemester,
  getAllSemester,
  academicSingleSemester,
  academicUpdateSemester,
  deletedSemester,
};
