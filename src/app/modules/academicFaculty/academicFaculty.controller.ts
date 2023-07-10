import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.contant';
import { academicFacultyServices } from './academicFaculty.service';

const createAacademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body;
    const result = await academicFacultyServices.createdAademicFaculty(
      academicFacultyData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'successfully ! Created academic faculty  ',
      data: result,
    });
  }
);

// all data gering controllers
const getAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationsFields);

  console.log({ filters });

  const result = await academicFacultyServices.getAllacademicFaculty(
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

export const academicFacultyControllers = {
  getAcademicFaculty,
  createAacademicFaculty,
};
