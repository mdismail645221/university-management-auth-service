import mongoose from 'mongoose';
import { IgenericErrorResposed } from '../interfaces/common';
import { IgenericErrorMessage } from '../interfaces/errors';

const handleCastError = (
  error: mongoose.Error.CastError
): IgenericErrorResposed => {
  const errors: IgenericErrorMessage[] = [
    {
      path: error?.path,
      message: error?.message,
    },
  ];

  return {
    statusCode: 400,
    message: `Cast Error`,
    errorMessage: errors,
  };
};

export default handleCastError;
