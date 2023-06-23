import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import { usersControllers } from './user.controller';
import { userValidationZod } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validationRequest(userValidationZod.createUserZodSchema),
  usersControllers.createUser
);

export const userRotues = router;
