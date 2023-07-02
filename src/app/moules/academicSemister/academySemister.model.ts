import status from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';
import {
  academicSemisterCodes,
  academicSemisterMonths,
  academicSemisterTitles,
} from './academicSemister.constant';
import {
  AcademicSemisterModel,
  IacademySemister,
} from './academySemister.interface';

export const academicSemisterSchema = new Schema<IacademySemister>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemisterTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemisterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonths,
    },
  },
  { timestamps: true }
);

academicSemisterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic Semester Already Exist');
  } else {
    next();
  }
});

export const AcademicSemister = model<IacademySemister, AcademicSemisterModel>(
  'academicSemister',
  academicSemisterSchema
);
