import { ZodError, ZodIssue } from 'zod';
import { IgenericErrorResposed } from '../interfaces/common';
import { IgenericErrorMessage } from '../interfaces/errors';

const handleZodError = (error: ZodError): IgenericErrorResposed => {
  const errorZodIssues: IgenericErrorMessage[] = error.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue.path,
        message: issue?.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'something went wrong',
    errorMessage: errorZodIssues,
  };
};

export default handleZodError;
