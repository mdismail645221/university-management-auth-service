import mongoose from 'mongoose';
import { IgenericErrorResposed } from '../interfaces/common';
import { IgenericErrorMessage } from '../interfaces/errors';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IgenericErrorResposed => {
  const errors: IgenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  return {
    statusCode: 400,
    message: `Validation Error`,
    errorMessage: errors,
  };
};

export default handleValidationError;
