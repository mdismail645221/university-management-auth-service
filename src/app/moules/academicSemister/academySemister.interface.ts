import { Model } from 'mongoose';
export type IAcademicSemisterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type IAcademicSemisterTitles = `Autumn` | `Summar` | `Fall`;
export type IAcademicSemisterCodes = `01` | `02` | `03`;

export type IacademySemister = {
  title: IAcademicSemisterTitles;
  year: number;
  code: IAcademicSemisterCodes;
  startMonth: IAcademicSemisterMonths;
  endMonth: IAcademicSemisterMonths;
};

export type AcademicSemisterModel = Model<
  IacademySemister,
  Record<string, unknown>
>;