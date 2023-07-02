import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import { academicSemisterControllers } from './academicSemister.controller';
import { academicSemisterValidationZod } from './academicSemister.validation';

const router = express.Router();

router.post(
  '/create-semester',
  validationRequest(
    academicSemisterValidationZod.createAcademicSemisterZodSchema
  ),
  academicSemisterControllers.CreateAcademicSemister
);

// router.get('/aaaa', academicSemisterControllers.getAllSemester);

export const academicSemisterRotues = router;
