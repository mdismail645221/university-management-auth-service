import { SortOrder } from 'mongoose';
import { helpers } from '../../../helpers/paginationHelpers';
import { IGenericrResposed } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicFacultyFilterableFields } from './academicFaculty.contant';
import {
  IAcademicFaculty,
  IAcademicFacultyFilter,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

// create a new title in service funtions save on mongodb
const createdAademicFaculty = async (payload: IAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// find all data getting services funtions
const getAllacademicFaculty = async (
  filters: IAcademicFacultyFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericrResposed<IAcademicFaculty[]>> => {
  const { searchTerm, ...filterData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    helpers.calculationPagination(paginationOptions);

  // data get search all condtion andCondition variables mapping
  const andCondition = [];

  // search filtering. which do not mathing filter
  if (searchTerm) {
    andCondition.push({
      $or: academicFacultyFilterableFields.map(fields => ({
        [fields]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Exact macth the fileds condtions
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// find single Faculty service funtion
const findOneFaculty = async (
  id: string
): Promise<IAcademicFaculty | null | undefined> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

// update service function
// const updateAcademicFaculty = async (
//   id: string,
//   payload: Partial<IAcademicFaculty>
// ): Promise<IAcademicFaculty | null> => {
//   console.log({ id, payload });
//   const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
//     new: true,
//   });
//   return result;
// };

const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// delete service fucntion
const deleteFaculty = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const academicFacultyServices = {
  getAllacademicFaculty,
  findOneFaculty,
  createdAademicFaculty,
  updateFaculty,
  deleteFaculty,
};
