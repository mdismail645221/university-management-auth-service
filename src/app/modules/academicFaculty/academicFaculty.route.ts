import express from 'express';
import { academicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/createAcademicFaculty',
  academicFacultyControllers.createAacademicFaculty
);

router.get(
  '/getAcademicFaculty',
  academicFacultyControllers.getAcademicFaculty
);

export const academicFacultyRoutes = router;
