import { Schema, model } from 'mongoose';
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

export const AcademicSemister = model<IacademySemister, AcademicSemisterModel>(
  'academicSemister',
  academicSemisterSchema
);
