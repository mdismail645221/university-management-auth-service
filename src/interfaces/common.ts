import { IgenericErrorMessage } from './errors';

export type IGenericrResposed<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IgenericErrorResposed = {
  statusCode: number;
  message: string;
  errorMessage: IgenericErrorMessage[];
};
