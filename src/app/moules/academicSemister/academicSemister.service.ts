import status from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { academicSemesterTitleCodeMapper } from './academicSemister.constant';
import { IacademySemister } from './academySemister.interface';
import { AcademicSemister } from './academySemister.model';

const createAcademicSemister = async (
  payload: IacademySemister
): Promise<IacademySemister> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid semester codes');
  }
  const result = await AcademicSemister.create(payload);
  return result;
};

export const AcademicSemisterService = {
  createAcademicSemister,
};
