import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { IgenericErrorMessage } from '../../interfaces/errors'

const golbalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({ biswas: err })

  const statusCode = 500
  const message = 'Something is wrong'
  const errorMessges: IgenericErrorMessage[] = []

  res.status(statusCode).json({
    success: false,
    message,
    errorMessges,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}

export default golbalErrorHandler
