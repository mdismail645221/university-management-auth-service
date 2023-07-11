import express from 'express';
import validationRequest from '../../middleware/zodValidationRequest';
import { academicFacultyControllers } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validations';

const router = express.Router();

// READ ROUTE
router.post(
  '/createAcademicFaculty',
  validationRequest(academicFacultyValidation.createFacultyZodSchema),
  academicFacultyControllers.createAacademicFaculty
);

// FIND ONE ROUTE
router.get(
  '/findOneFaculty/:id',
  academicFacultyControllers.singlefindOneAcademicFaculty
);

// GET ROUTE
router.get(
  '/getAcademicFaculty',
  academicFacultyControllers.getAcademicFaculty
);

// UPDATE ROUTE
router.patch(
  '/updateFaculty/:id',
  // validationRequest(academicFacultyValidation.updatefacultyZodSchema),
  academicFacultyControllers.updateFaculty
);

// DELETE ROUTE
router.delete(
  '/deleteFaculty/:id',
  academicFacultyControllers.deleteAcademicFaculty
);

export const academicFacultyRoutes = router;
