import { ErrorRequestHandler } from 'express'
import usersServices from './user.services'

const createUser: ErrorRequestHandler = async (error, req, res, next) => {
  try {
    const { users } = req.body
    const result = await usersServices.createUsers(users)

    res.status(200).json({
      success: true,
      message: `Successfully create user`,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export default {
  createUser,
}
