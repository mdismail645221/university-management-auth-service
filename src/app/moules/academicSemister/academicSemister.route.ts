import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import { academicSemisterControllers } from './academicSemister.controller';
import { academicSemisterValidationZod } from './academicSemister.validation';

const router = express.Router();

router.post(
  '/academic-semister',
  validationRequest(
    academicSemisterValidationZod.createAcademicSemisterZodSchema
  ),
  academicSemisterControllers.CreateAcademicSemister
);

export const userRotues = router;
