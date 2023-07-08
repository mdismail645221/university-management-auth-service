import express from 'express';
import validationRequest from '../../middleware/zodValidationRequest';
import { academicSemisterControllers } from './academicSemister.controller';
import { academicSemisterValidationZod } from './academicSemister.validation';

const router = express.Router();

router.post(
  '/createdSemester',
  validationRequest(
    academicSemisterValidationZod.createAcademicSemisterZodSchema
  ),
  academicSemisterControllers.createSemester
);
router.get(
  '/getSingleSemester/:id',
  academicSemisterControllers.academicSingleSemester
);
router.get('/getAllSemester', academicSemisterControllers.getAllSemester);

router.patch(
  '/updatedSemester/:id',
  validationRequest(
    academicSemisterValidationZod.UpdateAcademicSemisterZodSchema
  ),
  academicSemisterControllers.academicUpdateSemester
);

export const academicSemisterRotues = router;
