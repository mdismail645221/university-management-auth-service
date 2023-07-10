import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import { helpers } from '../../../helpers/paginationHelpers';
import { IGenericrResposed } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  academicSemesterTitleCodeMapper,
  academicSemisterSearchFilterAbleFields,
} from './academicSemister.constant';
import {
  IAcademicFilters,
  IAcademySemister,
} from './academySemister.interface';
import { AcademicSemister } from './academySemister.model';

// created a new academicSemister data and saved on Database in Mongodb Atlas
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

// get single semester services  funtions
const getSingleSemesterService = async (
  id: string
): Promise<IAcademySemister | null> => {
  const result = await AcademicSemister.findById(id);
  return result;
};

// all semister service functon
const getAllSemesters = async (
  filteringData: IAcademicFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericrResposed<IAcademySemister[]>> => {
  const { searchTerm, ...filterData } = filteringData;

  // data get search all condtion andCondition variables mapping
  const andCondition = [];

  // search filtering. which do not mathing filter
  if (searchTerm) {
    andCondition.push({
      $or: academicSemisterSearchFilterAbleFields.map(fields => ({
        [fields]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Exact Match filtering
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // ata ke ami aro optimezed koreci.....
  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  const { limit, page, skip, sortBy, sortOrder } =
    helpers.calculationPagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  //where condition.the AcademicSemister maybe andCondition recevied else {} recevied
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await AcademicSemister.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

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

// academic updated semester service function
const academicUpdatedSemesterService = async (
  id: string,
  payload: Partial<IAcademySemister>
): Promise<IAcademySemister | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Invalid semester codes ${payload.code}`
    );
  }

  const result = await AcademicSemister.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return result;
};

// deleted semester services funtions
const deletedSemesterService = async (
  id: string
): Promise<IAcademySemister | null> => {
  const result = await AcademicSemister.findByIdAndDelete(id);
  return result;
};

export const AcademicSemisterService = {
  createAcademicSemister,
  getAllSemesters,
  getSingleSemesterService,
  academicUpdatedSemesterService,
  deletedSemesterService,
};
