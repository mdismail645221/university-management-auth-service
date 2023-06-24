import { IacademySemister } from './academySemister.interface';
import { AcademicSemister } from './academySemister.model';

const createAcademicSemister = async (
  playload: IacademySemister
): Promise<IacademySemister> => {
  const result = await AcademicSemister.create(playload);
  return result;
};

export const AcademicSemisterService = {
  createAcademicSemister,
};
