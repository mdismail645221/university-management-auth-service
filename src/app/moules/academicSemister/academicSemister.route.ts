import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import { academicSemisterValidationZod } from './academicSemister.validation';

const router = express.Router();

router.post(
  '/academic-semister',
  validationRequest(
    academicSemisterValidationZod.createAcademicSemisterZodSchema
  )
  //   usersControllers.createUser
);

export const userRotues = router;
