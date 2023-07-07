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

// router.get('/aaaa', academicSemisterControllers.getAllSemester);

export const academicSemisterRotues = router;
