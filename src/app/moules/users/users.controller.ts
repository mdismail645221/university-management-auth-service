import { NextFunction, Request, Response } from 'express'
import usersServices from './users.services'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
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
