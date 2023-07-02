import { ZodError, ZodIssue } from 'zod';
import { IgenericErrorResposed } from '../interfaces/common';
import { IgenericErrorMessage } from '../interfaces/errors';

const handleZodError = (error: ZodError): IgenericErrorResposed => {
  const errors: IgenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'something went wrong',
    errorMessage: errors,
  };
};

export default handleZodError;
