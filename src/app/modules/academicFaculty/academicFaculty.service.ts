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

// all data getting services funtions
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

  // Filters needs $and to fullfill all the conditions
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
  //  andConditions.length > 0 ? { $and: andConditions } : {};

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

export const academicFacultyServices = {
  getAllacademicFaculty,
  createdAademicFaculty,
};
