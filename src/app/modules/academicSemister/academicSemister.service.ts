import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { helpers } from '../../../helpers/paginationHelpers';
import { IGenericrResposed } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
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

const getAllSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericrResposed<IAcademySemister[]>> => {
  const { limit, page, skip } =
    helpers.calculationPagination(paginationOptions);

  const result = await AcademicSemister.find().sort().skip(skip).limit(limit);

  const total = await AcademicSemister.countDocuments();

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: result,
  };
};

export const AcademicSemisterService = {
  createAcademicSemister,
  getAllSemesters,
};
