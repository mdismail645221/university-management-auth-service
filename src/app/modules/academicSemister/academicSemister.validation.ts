import { z } from 'zod';
import {
  academicSemisterCodes,
  academicSemisterMonths,
  academicSemisterTitles,
} from './academicSemister.constant';

const createAcademicSemisterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemisterTitles] as [string, ...string[]], {
      required_error: `title is required`,
      invalid_type_error: 'year must be Autumn , Summar, Fall',
    }),
    year: z.number({
      required_error: `Year is required`,
      invalid_type_error: 'year must be a number',
    }),
    code: z.enum([...academicSemisterCodes] as [string, ...string[]], {
      required_error: `code is required`,
      invalid_type_error: `year must be  ${academicSemisterCodes}`,
    }),
    startMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
      required_error: `startMonth is required`,
      invalid_type_error: `year must be a ${academicSemisterMonths}`,
    }),
    endMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
      required_error: `endMonth is required`,
      invalid_type_error: `year must be a ${academicSemisterMonths}`,
    }),
  }),
});

export const academicSemisterValidationZod = {
  createAcademicSemisterZodSchema,
};
