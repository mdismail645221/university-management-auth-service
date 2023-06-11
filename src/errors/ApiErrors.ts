class ApiError extends Error {
  statusCode: number
  constructor(statusCode: number, messsage: string | undefined, stack = '') {
    super(messsage)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default ApiError
