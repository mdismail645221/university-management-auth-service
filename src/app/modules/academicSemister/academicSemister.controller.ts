import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
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

// const CreateAcademicSemister: RequestHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { ...academicSemisterData } = req.body;
//     // console.log(academicSemisterData);
//     const result = await AcademicSemisterService.createAcademicSemister(
//       academicSemisterData
//     );
//     res.status(200).json({
//       statusCode: 400,
//       success: true,
//       message: `successfully created user`,
//       data: result,
//     });
//   } catch (error) {
//     next();
//   }
// };

// const getAllSemester = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const paginationOptions = {
//       page: Number(req.query.page),
//       limit: Number(req.query.limit),
//       sortBy: req.query.sortBy,
//       sortOrder: req.query.sortOrder,
//     };

//     const result = await AcademicSemisterService.getAllSemesters(
//       paginationOptions
//     );

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: `Successfully geting academic semester`,
//       data: result,
//     });
//     next();
//   }
// );

export const academicSemisterControllers = {
  createSemester,
  //   getAllSemester,
};
