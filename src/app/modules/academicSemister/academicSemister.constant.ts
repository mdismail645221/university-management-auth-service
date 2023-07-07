import {
  IAcademicSemisterCodes,
  IAcademicSemisterMonths,
  IAcademicSemisterTitles,
} from './academySemister.interface';

export const academicSemisterMonths: IAcademicSemisterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemisterTitles: IAcademicSemisterTitles[] = [
  'Autumn',
  'Fall',
  'Summer',
];

export const academicSemisterCodes: IAcademicSemisterCodes[] = [
  '01',
  '02',
  '03',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Fall: '02',
  Summer: '03',
};
