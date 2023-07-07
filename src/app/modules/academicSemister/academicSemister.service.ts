import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { academicSemesterTitleCodeMapper } from './academicSemister.constant';
import { IAcademySemister } from './academySemister.interface';
import { AcademicSemister } from './academySemister.model';

const createAcademicSemister = async (
  payload: IAcademySemister
): Promise<IAcademySemister> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Invalid semester codes ${payload.code}`
    );
  }
  const result = await AcademicSemister.create(payload);
  return result;
};

// const getAllSemesters = async (paginationOptions: IPaginationOptions) => {};

export const AcademicSemisterService = {
  createAcademicSemister,
  // getAllSemesters,
};
