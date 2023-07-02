import { Response } from 'express';

type ITypeResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: ITypeResponse<T>) => {
  const sendResponseData: ITypeResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  };

  res.status(data.statusCode).json(sendResponseData);
};

export default sendResponse;
