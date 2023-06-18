/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import config from '../../config'
import ApiError from '../../errors/ApiErrors'
import handleValidationError from '../../errors/handleValidationError'
import { IgenericErrorMessage } from '../../interfaces/errors'
import { errorLogger } from '../../shared/logger'

const golbalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log('globalError', error)
    : errorLogger.error('globalError', error)

  let statusCode = 500
  let message = `Something Went Wrong`
  let errorMessages: IgenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessage
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config?.env !== 'production' ? error?.stack : undefined,
  })

  next()
}

export default golbalErrorHandler
