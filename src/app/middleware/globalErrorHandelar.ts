import { ErrorRequestHandler } from 'express'
import config from '../../config'
import ApiError from '../../errors/ApiErrors'
import handleValidationError from '../../errors/handleValidationError'
import { IgenericErrorMessage } from '../../interfaces/errors'

const golbalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  res.status(400).json({
    error: error,
  })

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
