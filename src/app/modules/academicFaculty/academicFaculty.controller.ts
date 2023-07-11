import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/paginations';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.contant';
import { IAcademicFaculty } from './academicFaculty.interface';
import { academicFacultyServices } from './academicFaculty.service';

// create academicFaculty controller
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

  const result = await academicFacultyServices.getAllacademicFaculty(
    filters,
    paginationOptions
  );
  // response funtion. which common resposed funtions
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'getAllSemester retirived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const singlefindOneAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await academicFacultyServices.findOneFaculty(id);

    // response funtion. which common resposed funtions
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully! find your ID from database',
      data: result,
    });
  }
);

// update controller
const updateFaculty = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await academicFacultyServices.updateFaculty(id, updatedData);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty updated successfully',
      data: result,
    });
  })
);

// delete controller
const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params?.id;
    const result = await academicFacultyServices.deleteFaculty(id);

    // response funtion. which common resposed funtions
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'daleted Academic Faculty successfully',
      data: result,
    });
  }
);

export const academicFacultyControllers = {
  getAcademicFaculty,
  singlefindOneAcademicFaculty,
  createAacademicFaculty,
  updateFaculty,
  deleteAcademicFaculty,
};
